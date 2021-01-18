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

  it.only ('should response with 400 status code when password/email is null', function(done) {
    let body = {
      email: '',
      password: ''
    }

    request(app)
      .post('/login')
      .send(body)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Email is required', 'Password is required'])
        )

        done()
      })
  })

  
  
  // it ('should response with 404 status code', function(done) {
  //   const body = {
  //     email: 'aaadmin@mail.com',
  //     password: '1234'
  //   }

  //   request(app)
  //     .post('/login')
  //     .send(body)
  //     .end(function(err, res) {
  //       if (err) done(err)

  //       expect(res.statusCode).toEqual(404)
  //       expect(typeof res.body).toEqual('object')
  //       expect(res.body).toHaveProperty('errors')
  //       expect(res.body.errors).toEqual('Password or Email is not valid')

  //       done()
  //     })
  // })

  // it ('should response with 404 status code', function(done) {
  //   const body = {
  //     email: 1234,
  //     password: '1234'
  //   }

  //   request(app)
  //     .post('/login')
  //     .send(body)
  //     .end(function(err, res) {
  //       if (err) done(err)

  //       expect(res.statusCode).toEqual(404)
  //       expect(typeof res.body).toEqual('object')
  //       expect(res.body).toHaveProperty('errors')
  //       expect(typeof res.body.access_token).toEqual('string')
  //       expect(res.body.errors).toEqual({"message": "Password or Email is not valid"})

  //       done()
  //     })
  // })
})
