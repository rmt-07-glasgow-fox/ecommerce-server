const request = require("supertest");
const models = require("../models");
const app = require("../app");
const { clearProduct } = require("./helpers/clearDb");

describe("GET /products", () => {
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
      name: "T Shirt DELETE",
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

  it(`DELETE /products/:id (existing entry) should response with status code 200 and message 'Success, product deleted'`, (done) => {
    request(app)
      .delete(`/products/${data.id}`)
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toEqual({
          message: "Success, product deleted",
        });
      });
    done();
  });

  it(`DELETE /products/:id (non existing entry) should response with status code 404 and message 'Not Found'`, (done) => {
    request(app)
      .delete("/products/1")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toEqual({
          message: "Not Found",
        });
      });
    done();
  });
});
