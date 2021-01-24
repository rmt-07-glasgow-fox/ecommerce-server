const request = require("supertest");
const app = require("../app.js");
const models = require("../models");
const { clearUser, seedUser } = require("./helpers/clear-user.js");
const { User, Product } = require("../models");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { generateJwt } = require("../helpers/jwt.js");

// Setup
afterAll(function (done) {
  clearUser()
    .then(function () {
      return seedUser()
    })
    .then(function() {
      models.sequelize.close();
      done();
    })
    .catch(console.log);
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

describe("POST /register", function () {
  it("Should send response 200 status code", function (done) {
    // Setup
    const body = {
      email: "admin1@mail.com",
      password: "admin1",
      role: "admin",
    };
    // Execute
    request(app)
      .post("/register")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(typeof res.body.id).toEqual("number");
        expect(res.body).toHaveProperty("email");
        expect(typeof res.body.email).toEqual("string");
        expect(res.body.email).toEqual(body.email);
        done();
      });
  });

  it("Should send response 400 status code for wrong email format", function (done) {
    // Setup
    const body = {
      email: "admin123",
      password: "admin",
      role: "admin",
    };
    // Execute
    request(app)
      .post("/register")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Invalid email format"])
        );
        done();
      });
  });

  it("Should send response 400 status code for password minimal 3 characters", function (done) {
    // Setup
    const body = {
      email: "admin123@mail.com",
      password: "ad",
      role: "admin",
    };
    // Execute
    request(app)
      .post("/register")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Password minimal 3 chararcters"])
        );
        done();
      });
  });

  it("Should send response 400 status code for unique email", function (done) {
    // Setup
    const body = {
      email: "admin@mail.com",
      password: "adaadmin",
      role: "admin",
    };
    // Execute
    request(app)
      .post("/register")
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
            message: "Email have been registered",
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
      role: "admin",
    };
    // Execute
    request(app)
      .post("/register")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Email is required"])
        );
        done();
      });
  });

  it("Should send response 400 status code for empty password", function (done) {
    // Setup
    const body = {
      email: "admin131@mail.com",
      password: "",
      role: "admin",
    };
    // Execute
    request(app)
      .post("/register")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Password is required"])
        );
        done();
      });
  });

  it("Should send response 400 status code for undefined email", function (done) {
    // Setup
    const body = {
      email: undefined,
      password: "admin",
      role: "",
    };
    // Execute
    request(app)
      .post("/register")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Email is required"])
        );
        done();
      });
  });

  it("Should send response 400 status code for undefined password", function (done) {
    // Setup
    const body = {
      email: "admin52@mail.com",
      password: undefined,
      role: "",
    };
    // Execute
    request(app)
      .post("/register")
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Password is required"])
        );
        done();
      });
  });
});
