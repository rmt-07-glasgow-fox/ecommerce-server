const request = require("supertest");
const models = require("../models");
const app = require("../app");
const { clearProduct } = require("./helpers/clearDb");

describe("GET /product", () => {
  let access_token = "";
  let data = {};
  beforeAll((done) => {
    request(app)
      .post("/login")
      .send({
        email: "admin@mail.com",
        password: "123456",
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        access_token = res.body.access_token;
        done();
      });

    const body = {
      name: "T Shirt GET",
      url:
        "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/91b84bcc11df9d4386464f66f195f19870db12ca_xxl-1.jpg",
      price: 180000,
      stock: 20,
      CategoryId: 71,
    };
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        data.id = res.body.id;
        done();
      });
  });

  afterAll((done) => {
    clearProduct()
      .then((_) => {
        models.sequelize.close();
        done();
      })
      .catch(err, console.log(err));
  });

  it("GET /products/:id (existing entry) should response with status code 200", (done) => {
    request(app)
      .get(`/products/${data.id}`)
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("url");
        expect(res.body).toHaveProperty("price");
        expect(res.body).toHaveProperty("stock");
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("CategoryId");
        expect(res.body).toHaveProperty("Category");
        expect(res.body.Category).toHaveProperty("name");
        expect(typeof res.body.Category).toEqual("object");
        expect(res.body).toEqual({
          id: data.id,
          name: data.name,
          url: data.url,
          price: data.price,
          stock: data.stock,
          CategoryId: data.CategoryId,
          status: data.stock,
          Category: {
            name: expect.any(String),
          },
        });
      });
    done();
  });

  it("GET /products/:id (non existing entry) should response with status code 404", (done) => {
    request(app)
      .get("/products/1")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual({
          message: `Not Found`,
        });
      });
    done();
  });
});
