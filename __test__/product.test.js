const request = require("supertest")
const app = require("../app")
const { User, Product } = require("../models")
const { generateToken } = require("../helpers/jwt")


let access_token_admin
let access_token_notAdmin

let inputProduct = {
  name: "Monster Hunter World",
  imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
  price: "699999",
  stock: "100",
  genre: "adventure",
}
let productId

beforeAll(done => {
  User.findOne({
    where: { email: "admin@mail.com" }
  })
    .then(data => {
      access_token_admin = generateToken({
        id:data.id, email: data.email, role:data.role
      })
      return User.findOne({
        where: { email: "notAdmin@mail.com"}
      })
    })
    .then(data => {
      access_token_notAdmin = generateToken({
        id:data.id, email: data.email, role:data.role
      })
      return Product.create(inputProduct)
    })
    .then(data => {
      productId = data.id
      done()
    })
    .catch(err => {
      done()
    })
})

afterAll(() => {
  try {
    queryInterface.bulkDelete("Products", null)
    done()
  } catch (error) {
    done()
  }
});

describe("POST/products", function() {
  describe("POST success", () => {
    it("should send response with 201 status code", function(done) {
      //Setup
      const body = inputProduct
      //Execute
      request(app)
        .post("/products")
        .set({access_token: access_token_admin})
        .send(body)
        .end(function(err, res) {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("name")
          expect(res.body.name).toEqual(body.name)
          expect(res.body).toHaveProperty("imageUrl")
          expect(res.body.imageUrl).toEqual(body.imageUrl)
          expect(res.body).toHaveProperty("price")
          expect(res.body.price).toEqual(body.price)
          expect(res.body).toHaveProperty("stock")
          expect(res.body.stock).toEqual(body.stock)
          expect(res.body).toHaveProperty("genre")
          expect(res.body.genre).toEqual(body.genre)
  
          done()
        })
    })
  })

  describe("Required name field must not empty", () => {
    it("should send response with 400 status code", function(done) {
      //Setup
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: "699999",
        stock: "100",
        genre: "adventure",
      }
      const header = {
        access_token: ""
      }
      //Execute
      request(app)
        .post("/products")
        .send(body, header)
        .end(function(err, res) {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray)
  
          done()
        })
    })
  })


  
})