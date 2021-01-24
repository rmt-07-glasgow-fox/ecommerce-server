const request = require('supertest')
const app = require('../app')
const models = require('../models')

describe('POST/ login', function () {
  afterAll(function (done) {
    models.sequelize.close()
  })

  it('should response with 200 status code when login succeed', function (done) {
    //setup
    const body = {
      email: 'admin@mail.com',
      password: '1234',
    }

    //execute
    request(app)
    .post('/users/login')
    .send(body)
    .end(function (err, res) {
      //error supertest
      if (err) done(err);

      //assert
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('access_token')

      done()
    })
  })

  it('should response with 404 status code when username / password wrong', function (done) {
    //setup
    const body = {
      email: 'admim@mail.com',
      password: '1234',
    }

    //execute
    request(app)
    .post('/users/login')
    .send(body)
    .end(function (err, res) {
      //error supertest
      if (err) done(err)

      //assert
      expect(res.statusCode).toEqual(404)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('errors')

      done()
    })
  })
})