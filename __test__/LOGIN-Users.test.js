const request = require ('supertest')
const app = require ('../app')

describe ('POST /login', function () {
  it ('should send response with 200 status code', function (done) {
    const body = {
      email: 'admin@mail.com',
      password: 'admin'
    }

    request(app)
      .post('/login')
      .send(body)
        .end (function (err, res) {
          if (err) done (err)

          expect(res.statusCode).toEqual(200)
          expect (res.body).toHaveProperty ('access_token')
          expect (typeof res.body.access_token).toEqual ('string')

          done ()
        })
  })  
  
  it ('should send response with 400 status code', function (done) {
    const body = {
      email: '',
      password: '',
    }

  request (app)
    .post ('/login')
    .send (body)
    .end (function (err, res) {
      if (err) done (err)

      expect (res.statusCode).toEqual (400)
      expect (typeof res.body).toEqual ('object')
      expect (res.body).toHaveProperty ('message')
      expect (typeof res.body.message).toEqual ('string')
      expect(res.body.message).toEqual (expect.stringContaining("Invalid email / password")) 
      done ()

    })
  })
})