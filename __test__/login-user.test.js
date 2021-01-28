const request = require('supertest') 
const app = require('../app')

describe('POST /login API should be working', function() {
  
  it('shoud response with 200 status code', function(done) {
    let body = {
      email: 'admin@mail.com',
      password: '1234'
    }
    
    request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('access_token')
        expect(res.body).toEqual({
          access_token: expect.any(String)
        })

        done()
      })
  })

  it ('should response with 400 status code when password and email is null', function(done) {
    let body = {
      email: '',
      password: ''
    }

    request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Password or Email is not valid')

        done()
      })
  })
  
  it ('should response with 400 status code when email is not found in database', function(done) {
    let body = {
      email: 'aaaadmin@mail.com',
      password: '1234'
    }

    request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Password or Email is not valid')

        done()
      })
  })

  it ('should response with 400 status code when password incorrect', function(done) {
    let body = {
      email: 'admin@mail.com',
      password: 'qwert'
    }

    request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Password or Email is not valid')

        done()
      })
  })
})
