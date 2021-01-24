const request = require('supertest')

const app = require('../app')

const models = require('../models')

describe('POST /login', function () {
  afterAll(function(done) {
    models.sequelize.close()
    done()
  })

  describe('Success test case', function () {
    it('should return response 200 with access_token', function (done) {
      // Setup
      const body = {
        email: 'admin@mail.com',
        password: '123456'
      }
      // Execute
      request(app)
        .post('/login')
        .send(body)
        .end(function (err, res) {
          if(err) done(err)

          // Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('access_token')
          expect(typeof res.body.access_token).toEqual('string')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('fullName')
          expect(typeof res.body.fullName).toEqual('string')
          expect(res.body).toHaveProperty('email')
          expect(typeof res.body.email).toEqual('string')

          done()
        })
    })
  })

  describe('Failed test case', function () {
    it('should return response 400 when email is wrong', function (done) {
      const body = {
        email: 'admin1@mail.com',
        password: '123456'
      }

      request(app)
        .post('/login')
        .send(body)
        .end(function (err, res) {
          if(err) done(err)

          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Please check your email/password')

          done()
        })
    })

    it('should return response 400 when password is wrong', function (done) {
      const body = {
        email: 'admin@mail.com',
        password: '12345678'
      }

      request(app)
        .post('/login')
        .send(body)
        .end(function (err, res) {
          if(err) done(err)

          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Please check your email/password')

          done()
        })
    })

    it('should return response 400 when there is no email and password', function (done) {
      const body = {}

      request(app)
        .post('/login')
        .send(body)
        .end(function (err, res) {
          if(err) done(err)

          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Please check your email/password')

          done()
        })
    })
  })
})
