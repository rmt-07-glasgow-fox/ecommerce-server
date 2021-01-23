const request = require('supertest')
const app = require('../app')
const { User, Product } = require('../models')
const { generateToken } = require('../helpers/jwt')
const clearProducts = require('./helpers/clear-products')
const models = require('../models')

describe('PUT /products API should be working', function() {
  let access_token
  let user
  let newProduct
  
  beforeAll(done => {
    User.findOne({where: {email: 'admin@mail.com'}})
      .then(result => {
        let newProd = {
          name: 'Boneka Barbie',
          image_url: 'google.com',
          price: 10000,
          stock: 10,
          category: 'Boneka'
        }
        user = result
        return Product.create(newProd)
      })
      .then(output => {
          newProduct = output
          const payload = { id: user.id, email: user.email }
          access_token = generateToken(payload)
          done()
      })
  })
// create dulu, ambil id dari create product

  afterAll(done => {
    clearProducts()
    .then(function() {
      models.sequelize.close()
      done()
    })
    .catch(console.log)
  })
  
  it('should response with 200 status code', function(done) {

    request(app)
      .delete(`/products/${newProduct.id}`)
      .set('access_token', access_token)
      .end(function(err, res) {
        if(err) done(err)

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Product succesfully deleted')

        done()
      })
  })

  it('should response with status code 404 when product is not found', function(done) {

    request(app)
      .delete(`/products/1000`)
      .set('access_token', access_token)
      .end(function(err, res) {
        if(err) done(err)

        expect(res.statusCode).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('resource not found')

        done()
      })
  })

  it('should response with status code 401 when jwt is not provided', function(done) {

    request(app)
      .delete(`/products/${newProduct.id}`)
      .end(function(err, res) {
        if(err) done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('JWT must be provided')

        done()
      })
  })


})
