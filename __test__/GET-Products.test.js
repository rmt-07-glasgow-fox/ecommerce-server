const request = require ('supertest')
const app = require ('../app')
const { createDummy, clearProducts, login } = require ('../helpers/ProductHelpers')
let access_token = null

describe ('GET /products as admin', function () {
  beforeAll (function (done) {
    login ('admin@mail.com', 'admin')
      .then (data => {
        access_token = data
        done ()
      })
      .catch (console.log)
  })

  it ('should send response with 200 status code', function (done) {
    request (app)
      .get ('/products')
      .set ('access_token', access_token)
      .end (function (err, res) {
        if (err) done (err)

        expect(res.statusCode).toEqual(200)
        expect (Array.isArray (res.body)).toEqual(true)

        done ()
      })
  })    
})



describe ('GET /products as customer', function () {
  beforeAll (function (done) {
    login ('wow@gmail.com', 'qweqwe')
      .then (data => {
        access_token = data
        done ()
      })
      .catch (console.log)
  })

  it ('should send response with 200 status code', function (done) {
    request (app)
      .get ('/products')
      .set ('access_token', access_token)
      .end (function (err, res) {
        if (err) done (err)

        expect(res.statusCode).toEqual(200)
        expect (Array.isArray (res.body)).toEqual(true)

        done ()
      })
  })    
})