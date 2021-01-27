const request = require("supertest")
const app = require("../app")
const models = require("../models")

describe("POST/register", function () {
  describe('Post success', () => {
    it("should send response with 201 status code", function (done) {
      //SETUP
      const body = {
        email: "new@mail.com",
        password: "123456",
        name: "New person",
        role: "customer"
      }
      //EXECUTE
      request(app)
        .post("/register")
        .send(body)
        .end(function (err, res) {
          if (err) done(err)

          //ASSERT
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("email")
          expect(res.body).toHaveProperty("name")
          expect(res.body).toHaveProperty("role")
          expect(res.body.email).toEqual(body.email)
          expect(res.body.name).toEqual(body.name)
          expect(res.body.role).toEqual(body.role)

          done()
        })
    })
  });

  describe('Blank email, password, and name field', () => {
    it("should send response with 400 status code", function (done) {
      //SETUP
      const body = {
        email: "",
        password: "",
        name: "",
        role: "customer"
      }
      //EXECUTE
      request(app)
        .post("/register")
        .send(body)
        .end(function (err, res) {
          if (err) done(err)

          //ASSERT
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Email is required", "Password is required" , "Name is required"])
          );

          done()
        })
    })
  });

  describe('Email already used', () => {
    it("should send response with 400 status code", function (done) {
      //Setup
      const body = {
        email: "admin@mail.com",
        password: "123456",
        name: "random",
        role: "customer"
      }
      //Execute
      request(app)
        .post("/register")
        .send(body)
        .end(function (err, res) {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body).toEqual(
            expect.objectContaining({ message: "Email already used" })
          )
  
          done()
        })
    })
  });
})

describe("POST/login", function () {
  describe('Post success', () => {
    it("should send response with 200 status code", function (done) {
      //SETUP
      const body = {
        email: "admin@mail.com",
        password: "123456"
      }
      //EXECUTE
      request(app)
        .post("/login")
        .send(body)
        .end(function (err, res) {
          if (err) done(err)

          //ASSERT
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("access_token")
          expect(res.body).toHaveProperty("email")
          expect(res.body.email).toEqual(body.email)
          expect(res.body).toHaveProperty("name")

          done()
        })
    })
  });

  describe('Blank email and password field', () => {
    it("should send response with 401 status code", function (done) {
      //SETUP
      const body = {
        email: "",
        password: ""
      }
      //EXECUTE
      request(app)
        .post("/login")
        .send(body)
        .end(function (err, res) {
          if (err) done(err)

          //ASSERT
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body).toEqual(
            expect.objectContaining({ message: "Invalid email/password" })
          )

          done()
        })
    })
  });

  describe('Empty password field', () => {
    it("should send response with 401 status code", function (done) {
      //Setup
      const body = {
        email: "admin@mail.com",
        password: ""
      }
      //Execute
      request(app)
        .post("/login")
        .send(body)
        .end(function (err, res) {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body).toEqual(
            expect.objectContaining({ message: "Invalid email/password" })
          )

          done()
        })
    })
  });

  describe('Wrong password field', () => {
    it("should send response with 401 status code", function (done) {
      //Setup
      const body = {
        email: "admin@mail.com",
        password: "111111"
      }
      //Execute
      request(app)
        .post("/login")
        .send(body)
        .end(function (err, res) {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body).toEqual(
            expect.objectContaining({ message: "Invalid email/password" })
          )

          done()
        })
    })
  });

  describe('Email not registered', () => {
    it("should send response with 401 status code", function (done) {
      //Setup
      const body = {
        email: "notHere@mail.com",
        password: "123456"
      }
      //Execute
      request(app)
        .post("/login")
        .send(body)
        .end(function (err, res) {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body).toEqual(
            expect.objectContaining({ message: "Invalid email/password" })
          )
  
          done()
        })
    })
  });
})