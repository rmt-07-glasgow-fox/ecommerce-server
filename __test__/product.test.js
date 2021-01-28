const request = require("supertest")
const app = require("../app")
const models = require("../models")

let access_token = null
let access_token_client = null
let id = null

// login
describe("POST /login", () => {
    
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
        
        access_token = res.body.access_token
        done()
      })
  })
})

describe("POST /login", () => {
    
  it("should send response with 200 status code", (done) => {
    const body = {
      email: "client@mail.com",
      password: "123123"
    }

    request(app)
      .post("/login")
      .send(body)
      .end((err, res) => {
        if (err) done(err)
        
        access_token_client = res.body.access_token
        done()
      })
  })
})

// product
describe("POST /products", () => {

  // afterAll((done) => {
  //   models.sequelize.close()
  //   done()
  // })

  // success add product
  it("should send response with 201 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: 500000,
      stock: 10
    }

    request(app)
      .post("/products")
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("id")
        expect(typeof res.body.id).toEqual("number")
        expect(res.body).toHaveProperty("name")
        expect(res.body.name).toEqual(body.name)
        expect(res.body).toHaveProperty("image_url")
        expect(res.body.image_url).toEqual(body.image_url)
        expect(res.body).toHaveProperty("price")
        expect(res.body.price).toEqual(body.price)
        expect(res.body).toHaveProperty("stock")
        expect(res.body.stock).toEqual(body.stock)

        id = res.body.id
        done()
      })
  })

  // tidak menyertakan access_token
  it("should send response with 401 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: 500000,
      stock: 10
    }

    request(app)
      .post("/products")
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual("object")
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["You don't have access"])
        )

        done()
      })
  })

  // menyertakan access_token tapi bukan admin
  it("should send response with 401 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: 500000,
      stock: 10
    }

    request(app)
      .post("/products")
      .set('access_token', access_token_client)
      .send(body)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual("object")
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["You don't have access"])
        )

        done()
      })
  })

  // tidak mengisi required field
  it("should send response with 400 status code", (done) => {
    const body = {
      name: "",
      image_url: "",
      price: "",
      stock: ""
    }

    request(app)
      .post("/products")
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Name is required"]),
          expect.arrayContaining(["Image Url is required"]),
          expect.arrayContaining(["Price is required"]),
          expect.arrayContaining(["Stock is required"])
        )

        done()
      })
  })

  // // stock diisi angka minus
  it("should send response with 400 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: 500000,
      stock: -10
    }

    request(app)
      .post("/products")
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Minimum value is 0 in Number"])
        )

        done()
      })
  })

  // // price diisi angka minus
  it("should send response with 400 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: -500000,
      stock: 10
    }

    request(app)
      .post("/products")
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Minimum value is 0 in Number"])
        )

        done()
      })
  })

  // // field diisi dengan type data yang tidak sesuai
  it("should send response with 400 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: "500000",
      stock: "10"
    }

    request(app)
      .post("/products")
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Minimum value is 0 in Number"])
        )

        done()
      })
  })
})

describe(`PUT /products/${id}`, () => {

  // afterAll((done) => {
  //   models.sequelize.close()
  //   done()
  // })

  // success edit product
  it("should send response with 200 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: 400000,
      stock: 20
    }

    request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual("object")
        // expect(res.body).toHaveProperty("id")
        // expect(typeof res.body.id).toEqual("number")
        // expect(res.body).toHaveProperty("name")
        // expect(res.body.name).toEqual(body.name)
        // expect(res.body).toHaveProperty("image_url")
        // expect(res.body.image_url).toEqual(body.image_url)
        // expect(res.body).toHaveProperty("price")
        // expect(res.body.price).toEqual(body.price)
        // expect(res.body).toHaveProperty("stock")
        // expect(res.body.stock).toEqual(body.stock)

        done()
      })
  })

  // menyertakan access_token tapi bukan admin
  it("should send response with 401 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: 500000,
      stock: 10
    }

    request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token_client)
      .send(body)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual("object")
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["You don't have access"])
        )

        done()
      })
  })

  // // stock diisi angka minus
  it("should send response with 400 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: 500000,
      stock: -10
    }

    request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Minimum value is 0 in Number"])
        )

        done()
      })
  })

  // // price diisi angka minus
  it("should send response with 400 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: -500000,
      stock: 10
    }

    request(app)
     .put(`/products/${id}`)
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Minimum value is 0 in Number"])
        )

        done()
      })
  })

  // // field diisi dengan type data yang tidak sesuai
  it("should send response with 400 status code", (done) => {
    const body = {
      name: "Album One Ok Rock Eye of the Storm",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/One_Ok_Rock_%E2%80%93_Eye_of_the_Storm.png",
      price: "500000",
      stock: "10"
    }

    request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual("object")
        expect(res.body).toHaveProperty("errors")
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Minimum value is 0 in Number"])
        )

        done()
      })
  })
})

describe(`DELETE /products/${id}`, () => {

  afterAll((done) => {
    models.sequelize.close()
    done()
  })

  // tidak menyertakan access_token
  it("should send response with 401 status code", (done) => {

    request(app)
      .delete(`/products/${id}`)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual("object")
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["You don't have access"])
        )

        done()
      })
  })

  // menyertakan access_token tapi bukan admin
  it("should send response with 401 status code", (done) => {

    request(app)
      .delete(`/products/${id}`)
      .set('access_token', access_token_client)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual("object")
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["You don't have access"])
        )

        done()
      })
  })
})