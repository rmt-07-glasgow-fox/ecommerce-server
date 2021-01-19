const request = require('supertest')
const app = require('../app')
const clearProducts = require('./helpers/clear-products')
const clearAuth = require('./helpers/clear-auth')
const models = require('../models')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

let access_token_admin = ''
let access_token_customer = ''

describe('POST /products', function() {
  beforeAll(function(done) {
    User.create({ email: 'admin1@mail.com', password: '12345678', role: 'admin' })
    .then(data => {
      access_token_admin = generateToken({ id: data.id, email: data.email, role: data.role })
      return User.create({ email: 'user1@mail.com', password: '12345678', role: 'customer' })
    })
    .then(data => {
      access_token_customer = generateToken({ id: data.id, email: data.email, role: data.role })
      done()
    }).catch(err => {
      console.log(err)
      done()
    })
  })
  afterAll(function(done) {
    clearProducts()
      .then(function() {
        return clearAuth()
      })
      .then(function() {
        models.sequelize.close()
        done()
      })
      .catch(console.log)
  })
  describe('Success case should response:', function() {
    it('should send response with 201 status code', function(done) {
      // setup
      const body = {
        name: 'Samsung Galaxy Note 9',
        image_url: 'url',
        price: 8999000,
        stock: 100
      }
      // execute
      request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send(body)
        .end(function(err, res) {
          if(err) done(err)
          // assert
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual('object')
          expect(res.body.name).toEqual(body.name)
          expect(res.body.image_url).toEqual(body.image_url)
          expect(res.body.price).toEqual(body.price)
          expect(res.body.stock).toEqual(body.stock)
          done()
        })
    })
  })
  describe('Errors case should response:', function() {
    it('No access_token (401)', function(done) {
      const body = {
        name: 'Samsung Galaxy Note 9',
        image_url: 'url',
        price: 8999000,
        stock: 100
      }
      request(app)
        .post('/products')
        .set('access_token', '')
        .send(body)
        .end(function(err, res) {
          if (err) done(err)
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(['Please login first'])
          )
          done()
        })
    })
    it('Incorrect access_token (401)', function(done) {
      const body = {
        name: 'Samsung Galaxy Note 9',
        image_url: 'url',
        price: 8999000,
        stock: 100
      }
      request(app)
        .post('/products')
        .set('access_token', access_token_customer)
        .send(body)
        .end(function(err, res) {
          if (err) done(err)
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(['You dont have access'])
          )
          done()
        })
    })
    it('No Input fields (400)', function(done) {
      const body = {
        name: '',
        image_url: '',
        price: '',
        stock: ''
      }
      request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send(body)
        .end(function(err, res) {
          if (err) done(err)
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(['name is required', 'image_url is required', 'price is required', 'stock is required'])
          )
          done()
        })
    })
    it('Price less than 0 (400)', function(done) {
      const body = {
        name: 'Samsung Galaxy Note 9',
        image_url: 'url',
        price: -8999000,
        stock: 100
      }
      request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send(body)
        .end(function(err, res) {
          if (err) done(err)
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(['price must be greater than 0'])
          )
          done()
        })
    })
    it('Stock less than 0 (400)', function(done) {
      const body = {
        name: 'Samsung Galaxy Note 9',
        image_url: 'url',
        price: 8999000,
        stock: -100
      }
      request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send(body)
        .end(function(err, res) {
          if (err) done(err)
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(['stock must be greater than 0'])
          )
          done()
        })
    })
    it('Incorrect input type (400)', function(done) {
      const body = {
        name: 'Samsung Galaxy Note 9',
        image_url: 'url',
        price: 8999000,
        stock: 'string'
      }
      request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send(body)
        .end(function(err, res) {
          if (err) done(err)
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(['stock need input number'])
          )
          done()
        })
    })
  })
})