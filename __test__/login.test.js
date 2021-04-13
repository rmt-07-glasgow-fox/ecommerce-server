const request = require("supertest");
const app = require("../app");
const models = require("../models");

describe("POST /login", function () {
  afterAll(function (done) {
    models.sequelize.close();
    done();
  });

  it("successful login should send response with 200 status code", function (done) {
    // Setup
    const body = {
      email: "admin@mail.com",
      password: "123456",
    };

    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) {
          done(err);
        }

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(typeof res.body.id).toEqual("number");
        expect(res.body).toHaveProperty("email");
        expect(res.body.email).toEqual(body.email);
        expect(res.body).toHaveProperty("role");
        expect(res.body).toHaveProperty("access_token");
        expect(typeof res.body.access_token).toEqual("string");

        done();
      });
  });

  it("no input should send response with 400 status code", function (done) {
    // Setup
    const body = {
      email: "",
      password: "",
    };

    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) {
          done(err);
        }

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Email is required"])
        );

        done();
      });
  });

  it("no password should send response with 400 status code", function (done) {
    // Setup
    const body = {
      email: "admin@mail.com",
      password: "",
    };

    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) {
          done(err);
        }

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Password is required"])
        );

        done();
      });
  });

  it("wrong email should send response with 400 status code", function (done) {
    // Setup
    const body = {
      email: "test@mail.com",
      password: "123456",
    };

    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) {
          done(err);
        }

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Invalid email/password"])
        );

        done();
      });
  });

  it("wrong password should send response with 400 status code", function (done) {
    // Setup
    const body = {
      email: "admin@mail.com",
      password: "qwerty",
    };

    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) {
          done(err);
        }

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Invalid email/password"])
        );

        done();
      });
  });
});
