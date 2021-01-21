const request = require('supertest')
const app = require('../app')

describe('POST /login', () => {
  it('should send response with 200 status code', (done) => {
    //Setup
    const loginUser = {
      email: 'admin@mail.com',
      password: '1234'
    }
    //Execute
    request(app)
      .post('/login')
      .send(loginUser)
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

  it('should send response with 401 status code', (done) => {
    const loginUser = {
      email: 'admin@mail.com',
      password: ''
    }
    request(app)
      .post('/login')
      .send(loginUser)
      .end((err, res) => {
        if(err) {
          done(err)
        }
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body)).toEqual(false)
        expect(res.body.message).toEqual("Invalid email / password")
        done()
      })
  })
  
  it('should send response with 401 status code', (done) => {
    const loginUser = {
      email: '',
      password: ''
    }
    request(app)
      .post('/login')
      .send(loginUser)
      .end((err, res) => {
        if(err) {
          done(err)
        }
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body)).toEqual(false)
        expect(res.body.message).toEqual("Invalid email / password")
        done()
      })
  })
  
  it('should send response with 401 status code', (done) => {
    const loginUser = {
      email: '',
      password: '1234'
    }
    request(app)
      .post('/login')
      .send(loginUser)
      .end((err, res) => {
        if(err) {
          done(err)
        }
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body)).toEqual(false)
        expect(res.body.message).toEqual("Invalid email / password")
        done()
      })
  })
})





