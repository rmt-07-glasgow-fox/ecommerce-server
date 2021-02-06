const request = require("supertest");
const models = require("../models");
const app = require("../app");
const { clearProduct } = require("./helpers/clearDb");

describe("GET /products", () => {
  let access_token = "";
  beforeAll((done) => {
    request(app)
      .post("/login")
      .send({
        email: "admin@mail.com",
        password: "123456",
      })
      .end((err, res) => {
        access_token = res.body.access_token;
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

  it("GET /products should response with status code 200", (done) => {
    request(app)
      .get("/products")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
          res.body.map((product) => {
            expect(product).toHaveProperty("id");
            expect(product).toHaveProperty("name");
            expect(product).toHaveProperty("url");
            expect(product).toHaveProperty("price");
            expect(product).toHaveProperty("stock");
            expect(product).toHaveProperty("status");
            expect(product).toHaveProperty("CategoryId");
            expect(product).toHaveProperty("Category");
            expect(product.Category).toHaveProperty("name");
            expect(typeof product.Category).toEqual("object");
            expect(product).toEqual({
              id: expect.any(Number),
              name: expect.any(String),
              url: expect.any(String),
              price: expect.any(Number),
              stock: expect.any(Number),
              CategoryId: expect.any(Number),
              status: expect.any(String),
              Category: {
                name: expect.any(String),
              },
            });
          });
        }
        done();
      });
  });
});
