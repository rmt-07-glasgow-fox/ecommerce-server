const request = require('supertest')
const models = require('../models')
const app = require('../app')
const clearProducts = require('./helpers/clearProducts')

let id 
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxMTQ1MDUxMH0.mdOCnLbzDgzq79ACkLbe9I9KZt5YIWpmCvJRn-1D9yk'

describe('PUT/ update product', function () {
  afterAll(function (done) {
    clearProducts()
    .then(() => {
      models.sequelize.close()
      done()
    })
  })

  beforeAll (function (done) {

    const body = {
      name: 'test1',
      img_url: 'test',
      price: 12000,
      stock: 10,
    }

    request(app)
    .post('/products')
    .set('access_token', token)
    .send(body)
    .end(function (err, res) {
      if (err) done(err)
      id = res.body.id
      done()
    })
  })
  
  it('should response with 200 when update succseed', function (done) {
    //setup
    const body = {
      name: 'test',
      img_url: 'test',
      price: 10000,
      stock: 3,
    }

    //execute
    request(app)
    .put(`/products/${id}`)
    .set('access_token', token)
    .send(body)
    .end(function (err, res) {
      // error supertest
      if (err) done(err)

      //assert
      expect(res.statusCode).toEqual(200)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('name')
      expect(res.body.name).toEqual(body.name)
      expect(res.body).toHaveProperty('img_url')
      expect(res.body.img_url).toEqual(body.img_url)
      expect(res.body).toHaveProperty('price')
      expect(res.body.price).toEqual(body.price)
      expect(res.body).toHaveProperty('stock')
      expect(res.body.stock).toEqual(body.stock)

      done()
    })
  })

  it('should response with 401 status code when access_token is not found', function (done) {
    //setup
    const body = {
      name: 'test',
      img_url: 'test',
      price: 10000,
      stock: 3,
    }

    //execute
    request(app)
    .post('/products')
    .send(body)
    .end(function (err, res) {
      // error supertest
      if(err) done(err)

      //assert
      expect(res.statusCode).toEqual(401)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('errors')

      done()
    })
  })
})