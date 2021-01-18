const request = require('supertest')
const app = require('../app')

describe('POST /login', () => {
  it('should send response with 200 status code', (done) => {
    //Setup
    const body = {
      email: 'admin@mail.com',
      password: '1234'
    }
    //Execute
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) {
          done(err)
        }
        //Assert
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('access_token')
        done()
      })
  })
})
it('should send response with 401 status code', (done) => {
  //Setup
  const body = {
    email: 'admin@mail.com',
    password: ''
  }
  //Execute
  request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err) {
        done(err)
      }
      //Assert
      expect(res.statusCode).toEqual(401)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(Array.isArray(res.body)).toEqual(false)
      expect(res.body.message).toEqual(
        "Invalid username / password"
        // expect.arrayContaining(['Pasword is require'])
      )
      done()
    })
})


