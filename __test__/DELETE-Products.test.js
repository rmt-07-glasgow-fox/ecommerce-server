const request = require ('supertest')
const app = require ('../app')
const { createDummy, clearProducts, login } = require ('../helpers/ProductHelpers')
let access_token = null

describe ('DELETE /products as admin', function () {
  beforeAll (function (done) {
    createDummy()
    .then (data => {
      return login('admin@mail.com', 'admin')
    })
    .then (data => {
      access_token = data
      done ()
    })
    .catch (console.log)
  })

  afterAll (function (done) {
    clearProducts ()
      .then (function () {
        done ()
      })
      .catch (console.log)
  })

  it ('should send response with 200 status code', function (done) {
    request (app)
      .delete ('/products/777')
      .set ('access_token', access_token)
      .end (function (err, res) {
        if (err) done (err)

        expect (res.statusCode).toEqual (200)
        expect (typeof res.body).toEqual('object')

        done ()
      })
  })

  it ('should send response with 404 status code', function (done) {
    request (app)
      .delete ('/products/1000')
      .set ('access_token', access_token)
      .end (function (err, res) {
        if (err) done (err)

        expect (res.statusCode).toEqual (404)

        done ()
      })
  })
})



describe ('DELETE /products as customer', function () {
  beforeAll (function (done) {
    createDummy()
    .then (data => {
      return login('wow@gmail.com', 'qweqwe')
    })
    .then (data => {
      access_token = data
      done ()
    })
    .catch (console.log)
  })

  afterAll (function (done) {
    clearProducts ()
      .then (function () {
        done ()
      })
      .catch (console.log)
  })

  it ('should send response with 401 status code', function (done) {
    request (app)
      .delete ('/products/777')
      .set ('access_token', access_token)
      .end (function (err, res) {
        if (err) done (err)

        expect (res.statusCode).toEqual (401)
        expect (typeof res.body).toEqual('object')
        expect (res.body).toHaveProperty ('message')
        expect (typeof res.body.message).toEqual ('string')
        expect(res.body.message).toEqual ("Unauthorized access")

        done ()
      })
  })
})