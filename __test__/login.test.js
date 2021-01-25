const request = require('supertest')
const app = require('../app')
const models = require('../models')

describe('Test login', () => {
  afterAll(function(done) {
    models.sequelize.close()
    done()
  })
  it('should response StatCode (200) - OK', function (done) {
    const input = {
      email: 'admin@mail.com',
      password: '123456'
    }

    request(app)
      .post('/login')
      .send(input)
      .end(function (err, res) {
        if (err) {
          done(err)
        }

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('access_token')
        done()
      })
  })

  it('should response StatCode (401) - Unauthorized (email)', function (done) {
    const input = {
      email: 'ngasal@mail.com',
      password: 'qwe123'
    }

    request(app)
      .post('/login')
      .send(input)
      .end(function (err, res) {
        if (err) {
          done(err)
        }

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Invalid email or password')
        done()
      })
  })

  it('should response StatCode (401) - Unauthorized (password)', function (done) {
    const input = {
      email: 'test@mail.com',
      password: 'ngasal123'
    }

    request(app)
      .post('/login')
      .send(input)
      .end(function (err, res) {
        if (err) {
          done(err)
        }

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Invalid email or password')
        done()
      })
  })

  it('should response StatCode (500) - Internal server error', function (done) {
    const input = {
      emailasd: '',
      passwordasd: ''
    }

    request(app)
      .post('/login')
      .send(input)
      .end(function (err, res) {
        if (err) {
          done(err)
        }

        expect(res.statusCode).toEqual(500)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Internal server error')
        done()
      })
  })
})