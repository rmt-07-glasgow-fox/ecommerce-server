const request = require('supertest')
const { sequelize } = require('../models')
const app = require('../app')

describe('Login test', () => {
  afterAll(done => {
    sequelize.close()
    done()
  })

  it('Success ==> return 200 status code', (done) => {
    const body = {
      email: 'admin@gmail.com',
      password: 'admin123'
    }
    request(app)
      .post('/login')
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

  it('Failed ==> Insert empty email and password, return 400 status code', (done) => {
    const body = {
      email: '',
      password: ''
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Failed ==> Insert invalid email, return 400 status code', (done) => {
    const body = {
      email: 'ini bukan email',
      password: ''
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Failed ==> Email not registered, return 401 status code', (done) => {
    const body = {
      email: 'ada_amin@gmail.com',
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
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })

  it('Failed ==> Insert wrong password, return 401 status code', (done) => {
    const body = {
      email: 'admin@gmail.com',
      password: 'ada_amin'
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})