const request = require("supertest");

const app = require("../app.js");
const models = require("../models");

// Setup
afterAll(async (done) => {
  await models.sequelize.close();
  done();
});
describe("POST /login", function () {
  it("Should send response 200 status code", function (done) {
    // Setup
    const body = {
      email: "admin@mail.com",
      password: "admin",
      role: "admin",
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("access_token");
        // models.sequelize.close();
        done();
      });
  });

  it("Should send response 400 status code for wrong password", function (done) {
    // Setup
    const body = {
      email: "admin@mail.com",
      password: "admin123",
      role: "",
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Validation Error",
            message: "Invalid Email or Password",
          })
        );
        done();
      });
  });

  it("Should send response 400 status code for email not found", function (done) {
    // Setup
    const body = {
      email: "admin123@mail.com",
      password: "admin",
      role: "",
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Validation Error",
            message: "Invalid Email or Password",
          })
        );
        done();
      });
  });

  it("Should send response 400 status code for empty email", function (done) {
    // Setup
    const body = {
      email: "",
      password: "admin",
      role: "",
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Validation Error",
            message: "Invalid Email or Password",
          })
        );
        done();
      });
  });

  it("Should send response 400 status code for empty password", function (done) {
    // Setup
    const body = {
      email: "admin@mail.com",
      password: "",
      role: "",
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Validation Error",
            message: "Invalid Email or Password",
          })
        );
        done();
      });
  });

  it("Should send response 500 status code for undefined email", function (done) {
    // Setup
    const body = {
      email: undefined,
      password: "admin",
      role: "",
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(500);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Error from Server",
            message: "Internal server error",
          })
        );
        done();
      });
  });

  it("Should send response 500 status code for undefined password", function (done) {
    // Setup
    const body = {
      email: "admin@mail.com",
      password: undefined,
      role: "",
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(500);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Error from Server",
            message: "Internal server error",
          })
        );
        done();
      });
  });
});
