const request = require("supertest");
const app = require("../app.js");
const models = require("../models");
const clearProduct = require("./helpers/clear-product.js");
const { User, Product } = require("../models");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { generateJwt } = require("../helpers/jwt.js");

// Setup
let access_token;
let access_token_notAdmin;

beforeAll((done) => {
  User.findOne({ where: { email: "admin@mail.com" } })
    .then((dataUser) => {
      const payload = {
        id: dataUser.id,
        email: dataUser.email,
        role: dataUser.role,
      };
      access_token = generateJwt(payload);
      return User.findOne({ where: { email: "notadmin@mail.com" } });
    })
    .then((dataUser) => {
      const payload = {
        id: dataUser.id,
        email: dataUser.email,
        role: dataUser.role,
      };
      access_token_notAdmin = generateJwt(payload);
      done();
    })
    .catch((err) => {
      done();
    });
});

afterAll(async (done) => {
  await models.sequelize.close();
  done();
});

describe("GET /products", function () {
  it("Should send response 200 status code", function (done) {
    // Execute
    request(app)
      .get("/products")
      .set("access_token", access_token)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(Array.isArray(res.body)).toEqual(true);
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            image_url: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number),
            UserId: expect.any(Number),
          }),
        ]);
        done();
      });
  });

  it("Should send response with 200 status code", function (done) {
    // Execute
    request(app)
      .get("/products")
      .set("access_token", access_token_notAdmin)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(Array.isArray(res.body)).toEqual(true);
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            image_url: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number),
            UserId: expect.any(Number),
          }),
        ]);
        done();
      });
  });

  it("Should send response with 401 status code for access without access_token (Unauthorized)", function (done) {
    // Execute
    request(app)
      .get("/products")
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Unauthorized",
            message: "The requested page needs a valid username and a password",
          })
        );
        done();
      });
  });
});
