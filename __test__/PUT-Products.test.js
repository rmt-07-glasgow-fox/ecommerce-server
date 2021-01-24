const request = require ('supertest')
const app = require ('../app')
const { createDummy, clearProducts, login } = require ('../helpers/ProductHelpers')
let access_token = null

describe ('PUT /products as admin', function () {
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
    const body = {
      name: 'edited product name',
      image_url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      price: 7000.00,
      stock: 7
    }

    request (app)
    .put ('/products/777')
    .set ('access_token', access_token)
    .send (body)
    .end (function (err, res) {
      if (err) done (err)

      expect (res.statusCode).toEqual (200)
      expect (typeof res.body).toEqual ('object')
      expect (res.body).toHaveProperty ('id')
      expect (res.body).toHaveProperty ('name')
      expect (res.body).toHaveProperty ('image_url')
      expect (res.body).toHaveProperty ('price')
      expect (res.body).toHaveProperty ('stock')
      expect (typeof res.body.id).toEqual ('number')
      expect (typeof res.body.name).toEqual ('string')
      expect (typeof res.body.image_url).toEqual ('string')
      expect (typeof res.body.price).toEqual ('number')
      expect (typeof res.body.stock).toEqual ('number')
      expect (res.body.name).toEqual (body.name)
      expect (res.body.image_url).toEqual (body.image_url)
      expect (res.body.price).toEqual (body.price)
      expect (res.body.stock).toEqual (body.stock)
      
      done ()
    })
  })

  it ('should send response with 404 status code', function (done) {
    const body = {
      name: 'edited product name',
      image_url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      price: 7000.00,
      stock: 7
    }

    request (app)
    .put ('/products/1000')
    .set ('access_token', access_token)
    .send (body)
    .end (function (err, res) {
      if (err) done (err)

      expect (res.statusCode).toEqual (404)
      expect (typeof res.body).toEqual ('object')
      expect (res.body).toHaveProperty ('message')
      expect (res.body.message).toEqual ('Error not found')

      done ()
    })
  })

  it ('should send response with 400 status code', function (done) {
    const body = {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }

    request (app)
    .put ('/products/1000')
    .set ('access_token', access_token)
    .send (body)
    .end (function (err, res) {
      if (err) done (err)

      expect (res.statusCode).toEqual (400)
      expect (typeof res.body).toEqual ('object')
      expect (res.body).toHaveProperty ('errors')
      expect (Array.isArray (res.body.errors)).toEqual(true)
      expect (res.body.errors).toEqual (
        expect.arrayContaining (['Product name required', 'Image url required', 'Price required', 'Stock amount required'])
      )

      done ()
    })
  })

  it ('should send response with 400 status code', function (done) {
    const body = {
      name: '',
      image_url: '',
      price: -1,
      stock: -1
    }

  request (app)
    .post ('/products')
    .set ('access_token', access_token)
    .send (body)
    .end (function (err, res) {
      if (err) done (err)

      expect (res.statusCode).toEqual (400)
      expect (typeof res.body).toEqual ('object')
      expect (res.body).toHaveProperty ('errors')
      expect (Array.isArray (res.body.errors)).toEqual(true)
      expect (res.body.errors).toEqual (
        expect.arrayContaining (['Product name required', 'Image url required', 'Price must be equal or above 0', 'Price must be equal or above 0'])
      )
      done ()

    })
  })
}) 





describe ('POST /products as customer', function () {
  beforeAll (function (done) {
    login('wow@gmail.com', 'qweqwe')
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

  it ('should send response with 400 status code', function (done) {
    const body = {
      name: 'New Product',
      image_url: 'werwerwerwe',
      price: 5000,
      stock: 5
    }

  request (app)
    .post ('/products')
    .send (body)
    .set ('access_token', access_token)
    .end (function (err, res) {
      if (err) done (err)

      expect (res.statusCode).toEqual (401)
      expect (typeof res.body).toEqual ('object')
      expect (res.body).toHaveProperty ('message')
      expect (typeof res.body.message).toEqual ('string')
      expect(res.body.message).toEqual ("Unauthorized access")
      done ()

    })
  })
})