const request = require('supertest')
const models = require('../models')
const app = require('../app')

afterAll(done => {
  models.sequelize.close()
  done()
})
describe('POST /login', () => {
  it('Login success, return 200 status code', (done) => {
    //setup
    const body = {
      email: 'admin@gmail.com',
      password: 'admin123'
    }
    // execute
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)

        //Assert
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('access_token')
        done()
      })
  })

  it('Invalid password, return 401 status code', (done) => {
    const body = {
      email: 'admin@gmail.com',
      password: 'adaamin'
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Email not register, return 401 status code', (done) => {
    const body = {
      email: 'adaamin@gmail.com',
      password: 'admin123'
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Insert empty email and password, return 401 status code', (done) => {
    const body = {
      email: '',
      password: ''
    }

    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  
})