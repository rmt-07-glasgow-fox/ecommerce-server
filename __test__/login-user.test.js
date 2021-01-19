const request = require('supertest')
const app = require('../app')

describe('POST users/login', () => {
  it('should send response with 200 status code', (done) => {
    const body = {
      email: "user@mail.com",
      password: '123456',
    }

    request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)


        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('access_token')
        expect(typeof res.body.access_token).toEqual('string')

        done()
      })
  })
})

describe('POST users/login', () => {
  it('should send response with 400 status code', (done) => {
    const body = {
      email: "user@mail.com",
      password: '1234567',
    }

    request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        expect(res.body.message).toEqual('Invalid Email or Password')
        done()
      })
  })
})