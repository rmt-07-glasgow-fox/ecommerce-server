const request = require('supertest')
const app = require('../app')
const models = require('../models')

let id
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxMTQ1MDUxMH0.mdOCnLbzDgzq79ACkLbe9I9KZt5YIWpmCvJRn-1D9yk'

describe('DELETE/ deleteProduct', function () {

  afterAll(function (done) {
    models.sequelize.close()
    done()
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

  it('should response with 200 status code when delete succeed', function (done) {
    //setup

    //execute
    request(app)
    .delete(`/products/${id}`)
    .set('access_token', token)
    .end(function (err, res) {
      //error supertest
      if (err) done(err)

      //assert
      expect(res.statusCode).toEqual(200)
      expect(typeof res.body).toEqual('object')
      
      done()
    })
  })
  
})