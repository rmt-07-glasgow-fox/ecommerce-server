const request = require('supertest')
const app = require('../app')
const clearUsers = require('./helpers/clear-users')

describe('POST users/register', () => {
  afterAll((done) => {
    clearUsers()
      .then(() => {
        done()
      })
      .catch(console.log)
  })

  it('should send response with 201 status code', (done) => {
    const body = {
      email: 'user@mail.com',
      password: '123456',
      role: 'customer'
    }

    request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        if(err) done(err)

        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('email')
        done()
      })
  })
})

describe('POST users/register', () => {
  afterAll((done) => {
    clearUsers()
      .then(() => {
        done()
      })
      .catch(console.log)
  })

  it('should send response with 400 status code', (done) => {
    const body = {
      email: 'user@mail.com',
      password: '1234',
      role: 'customer'
    }

    request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        if(err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body.message).toEqual('Password at least 6 characters')
        done()
      })
  })
})