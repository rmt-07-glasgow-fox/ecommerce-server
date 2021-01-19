const request = require('supertest')
const app = require('../app')
const models = require('../models/')
const seedUsers = require('./helpers/seedUsers')
const clearUsers = require('./helpers/clearUsers')

beforeAll((done) => {
  // create user di sini, jangan lupa hooks beforeCreate utk hash password
  seedUsers()
    .then(() => {
      done()
    })
    .catch(console.log)
})

afterAll((done) => {
  clearUsers()
    .then(() => {
      models.sequelize.close()
      done()
    })
    .catch(console.log)
})

describe('POST /login', () => {

  // success case
  it('should send response with 200 status code', (done) => {
    const body = {
      email: 'admin@mail.com',
      password: 'thisisnotapassword'
    }

    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')

        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toEqual('number')

        expect(res.body).toHaveProperty('email')
        expect(typeof res.body.email).toEqual('string')
        expect(res.body.email).toEqual(body.email)

        done()
      })
  })

  // unauthorised case
  it('should send response with 401 status code', (done) => {
    const body = {
      email: 'admin@mail.com',
      password: 'failedpassword'
    }

    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')

        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Wrong email / password'])
        )

        done()
      })
  })
})
