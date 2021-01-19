const request = require('supertest')
const app = require('../app')
const clearAuth = require('./helpers/clear-auth')
const models = require('../models')
const { User } = require('../models')

describe('POST /login', function() {
  beforeAll(function(done) {
    const newUser = {
      email: 'admin@mail.com',
      password: '12345678',
      role: 'admin'
    }
    User.create(newUser)
      .then(data => {
        // console.log(data)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  afterAll(function(done) {
    clearAuth()
      .then(function() {
        models.sequelize.close()
        done()
      })
      .catch(console.log)
  })
  describe('Success case should send responses:', function() {
    it('should send response with 200', function(done) {
      const body = {
        email: 'admin@mail.com',
        password: '12345678',
      }
      request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('access_token')
        done()
      })
    })
  })
  describe('Errors case should send responses:', function() {
    it('Incorrect Password (400)', function(done) {
      const body = {
        email: 'admin@mail.com',
        password: 'abcdefgh',
      }
      request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('errors')
        expect(typeof res.body).toEqual('object')
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Invalid email or password'])
        )
        done()
      })
    })
    it('Incorrect email (401)', function(done) {
      const body = {
        email: 'user@mail.com',
        password: '12345678',
      }
      request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('errors')
        expect(typeof res.body).toEqual('object')
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Invalid email or password'])
        )
        done()
      })
    })
    it('Empty email and password (401)', function(done) {
      const body = {
        email: '',
        password: '',
      }
      request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('errors')
        expect(typeof res.body).toEqual('object')
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Invalid email or password'])
        )
        done()
      })
    })
  })
})