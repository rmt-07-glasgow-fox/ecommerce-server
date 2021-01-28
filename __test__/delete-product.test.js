const request = require('supertest')

const app = require('../app')
const insertProduct = require('./helpers/insert-product')
const { loginAdmin, loginCustomer } = require('./helpers/login')

const models = require('../models')

describe('DELETE /products/:id', function () {
  let productId, access_token, customer_token

  beforeAll(function (done) {
    loginAdmin()
      .then(function (res) {
        access_token = res.body.access_token

        return loginCustomer()
      })
      .then(function (res) {
        customer_token = res.body.access_token

        done()
      })
      .catch(console.log)
  })

  beforeEach(function (done) {
    insertProduct()
      .then(product => {
        productId = product.id

        done()
      })
      .catch(console.log)
  })

  afterAll(function(done) {
    models.sequelize.close()
    done()
  })

  describe('Success test case', function() {
    it('should return response 200 with success message', function(done) {
      // Setup
      // Execute
      request(app)
        .delete('/products/' + productId)
        .set('access_token', access_token)
        .end(function(err, res) {
          if(err) done(err)

          // Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toEqual('Product deleted successfully')

          done()
        })

    })
  })

  describe('Failed test case', function() {
    it('should return response 401 with error details', function(done) {
      // Setup
      // Execute
      request(app)
        .delete('/products/' + productId)
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
        .delete('/products/' + productId)
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
