const request = require("supertest")
const app = require("../app")
const models = require("../models")
const clearUser = require("./helpers/clearUser")

// describe("POST /register", () => {
//   afterAll((done) => {
//     clearUser()
//     .then(() => {
//       models.sequelize.close()
//       done()
//     })
//     .catch(console.log)
//   })

//   it("should send response with 201 status code", (done) => {
//     const body = {
//       name: "Test User",
//       email: "test@mail.com",
//       password: "123123"
//     }

//     request(app)
//       .post("/register")
//       .send(body)
//       .end((err, res) => {
//         if (err) done(err)

//         expect(res.statusCode).toEqual(201)
//         expect(typeof res.body).toEqual("object")
//         expect(res.body).toHaveProperty("id")
//         expect(typeof res.body.id).toEqual("number")
//         expect(res.body).toHaveProperty("name")
//         expect(res.body.name).toEqual(body.name)
//         expect(res.body).toHaveProperty("email")
//         expect(res.body.email).toEqual(body.email)
//         expect(res.body).toHaveProperty("password")
//         expect(res.body.password).toEqual(body.password)

//         done()
//       })
//   })

//   it("should send response with 400 status code", (done) => {
//     const body = {
//       name: "",
//       email: "",
//       password: ""
//     }

//     request(app)
//       .post("/register")
//       .send(body)
//       .end((err, res) => {
//         if (err) done(err)

//         expect(res.statusCode).toEqual(400)
//         expect(typeof res.body).toEqual("object")
//         expect(res.body).toHaveProperty("errors")
//         expect(Array.isArray(res.body.errors)).toEqual(true)
//         expect(res.body.errors).toEqual(
//           expect.arrayContaining(["Name is required"]),
//           expect.arrayContaining(["Email is required"]),
//           expect.arrayContaining(["Email has been registered"]),
//           expect.arrayContaining(["Password is required"])
//         )

//         done()
//       })
//   })
// })

describe("POST /login", () => {
  afterAll((done) => {
    models.sequelize.close()
    done()
  })

  it("should send response with 200 status code", (done) => {
    const body = {
      email: "test@mail.com",
      password: "123123"
    }

    request(app)
      .post("/login")
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("access_token")
        // expect(res.body.email).toEqual(body.email)

        done()
      })
  })

  it("should send response with 400 status code", (done) => {
    const body = {
      email: "test@mail.com",
      password: "321321"
    }

    request(app)
      .post("/login")
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Invalid email / password"])
        )

        done()
      })
  })

  it("should send response with 400 status code", (done) => {
    const body = {
      email: "test1@mail.com",
      password: "123123"
    }

    request(app)
      .post("/login")
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Invalid email / password"])
        )

        done()
      })
  })

  it("should send response with 400 status code", (done) => {
    const body = {
      email: "",
      password: ""
    }

    request(app)
      .post("/login")
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Invalid email / password"])
        )

        done()
      })
  })
})