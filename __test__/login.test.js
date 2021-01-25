const request = require("supertest")
const app = require("../app")
const models = require('../models')

describe("POST /login", function () {
  afterAll(function (done) {
    models.sequelize.close();
    done();
  });
  it("Success - should send response 200 status code", function (done) {
    // setup
    const body = {
      email: "admin@mail.com",
      password: "12341234",
    }
    // execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        // error supertest
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("id")
        expect(typeof res.body.id).toEqual("number")
        expect(res.body).toHaveProperty("email")
        expect(res.body.email).toEqual(body.email)
        expect(res.body).toHaveProperty("role")
        expect(res.body).toHaveProperty("access_token")
        expect(typeof res.body.access_token).toEqual("string")

        done()
      })
  })

  it("No input - should send response with 400 status code", function (done) {
    // setup
    const body = {
      email: "",
      password: "",
    }
    // execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Email is required"])
        )

        done()
      })
  })

  it("No Password - should send response with 400 status code", function (done) {
    // setup
    const body = {
      email: "admin@mail.com",
      password: "",
    }
    // execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Password is required"])
        )

        done()
      })
  })

  it("Wrong Email - should send response with 400 status code", function (done) {
    // setup
    const body = {
      email: "coba@mail.com",
      password: "12341234",
    }
    // execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Invalid email or password"])
        )

        done()
      })
  })

  it("Wrong Password - should send response with 400 status code", function (done) {
    // setup
    const body = {
      email: "admin@mail.com",
      password: "43124312",
    }
    // execute
    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Invalid email or password"])
        )

        done()
      })
  })
})
