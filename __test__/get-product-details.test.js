const request = require('supertest')

const app = require('../app')
const insertProduct = require('./helpers/insert-product')
const { loginAdmin, loginCustomer } = require('./helpers/login')

const models = require('../models')

describe('GET /products/:id', function() {
  let access_token, customer_token, product

  beforeAll(function (done) {
    loginAdmin()
      .then(function (res) {
        access_token = res.body.access_token

        return loginCustomer()
      })
      .then(function (res) {
        customer_token = res.body.access_token

        return insertProduct()
      })
      .then(function (prod) {
        product = prod
        done()
      })
      .catch(console.log)
  })

  afterAll(function(done) {
    models.sequelize.close()
    done()
  })

  describe('Success test case', function() {
    it('should return response 200 with product details', function(done) {
      request(app)
        .get('/products/' + product.id)
        .set('access_token', access_token)
        .end(function(err, res) {
          if(err) done(err)

          // Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('name')
          expect(res.body.name).toEqual(product.name)
          expect(res.body).toHaveProperty('description')
          expect(res.body.description).toEqual(product.description)
          expect(res.body).toHaveProperty('category')
          expect(res.body.category).toEqual(product.category)
          expect(res.body).toHaveProperty('image_url')
          expect(res.body.image_url).toEqual(product.image_url)
          expect(res.body).toHaveProperty('price')
          expect(res.body.price).toEqual(product.price)
          expect(res.body).toHaveProperty('stock')
          expect(res.body.stock).toEqual(product.stock)

          done()
        })
    })
  })

  describe('Failed test case', function() {
    it('should return response 401 with error details', function(done) {
      // Setup
      // Execute
      request(app)
        .get('/products/' + product.id)
        .end(function(err, res) {
          if(err) done(err)

          // Assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toEqual('Please login first')

          done()
        })
    })

    it('should return response 403 with error details', function(done) {
      // Setup

      //Execute
      request(app)
        .get('/products/' + product.id)
        .set('access_token', customer_token)
        .end(function(err, res) {
          if (err) done(err)
          // Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toEqual('You are not allowed')

          done()
        })
    })
  })
})
