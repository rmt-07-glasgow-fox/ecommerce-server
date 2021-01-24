const request = require('supertest')

const app = require('../app')
const insertProduct = require('./helpers/insert-product')
const { loginAdmin, loginCustomer } = require('./helpers/login')

const models = require('../models')

describe('GET /products', function () {
  let productId, access_token, customer_token

  beforeAll(function (done) {
    loginAdmin()
      .then(function (res) {
        access_token = res.body.access_token

        return insertProduct()
      })
      .then(product => {
        productId = product.id

        return loginCustomer()
      })
      .then(function (res) {
        customer_token = res.body.access_token

        done()
      })
      .catch(console.log)
  })

  afterAll(function(done) {
    models.sequelize.close()
    done()
  })

  describe('Success test case', function() {
    it('should return response 200 with products list', function(done) {
      // Setup
      // Execute
      request(app)
        .get('/products')
        .set('access_token', access_token)
        .end(function(err, res) {
          if(err) done(err)

          // Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(Array.isArray(res.body)).toEqual(true)

          done()
        })

    })
  })
})
