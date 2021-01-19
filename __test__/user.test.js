const request = require('supertest')
const app = require('../app')
const { hashingPassword } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const models = require('../models')
let access_token

beforeAll((done) => {
  queryInterface.bulkInsert('Users', [{
    email: 'ifan@mail.com',
    password: hashingPassword('asdfasdf'),
    role: 'customer',
    username: 'ifan'
  }])
  .then((user) => {
    let payload = {
      id: user.id,
      email: user.email,
      username: user.username
    }

    access_token = generateToken(payload)
    done()
  })
  .catch((error) => {
    done(error)
  })
})

afterAll((done) => {
  queryInterface.bulkDelete('Users')
  .then(() => {
    models.sequelize.close()
    done()
  })
  .catch((error) => {
    done(error)
  })
})

describe('POST /login user', () => {
  // if login success
  it('if login success should send response with 200 status code', (done) => {
    // setup
    const body = {
      email: 'ifan@mail.com',
      password: 'asdfasdf'
    }

    // execute
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        // assertion
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')

        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toEqual('number')

        expect(res.body).toHaveProperty('email')
        expect(res.body.email).toEqual(body.email)
        expect(typeof res.body.email).toEqual('string')

        expect(res.body).toHaveProperty('access_token', access_token)
      })
  })

  // if findOne email, but wrong password
  it('if email finded, but wrong password should send response with 401 status code', (done) => {
    // setup
    const body = {
      email: 'ifan@mail.com',
      password: '123456'
    }

    // execute
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        // assertion
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg', 'Invalid email / password')
      })
  })

  // if findOne email not in db
  it('if findOne email not in db should send response with 401 status code', (done) => {
    // setup
    const body = {
      email: 'testaja@mail.com',
      password: '123456'
    }

    // execute
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        // assertion
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg', 'Invalid email / password')
      })
  })

  // it respon error bad requeest tdk memasukan field email dan password
  it('if is field required not filled should send response with 400 status code', (done) => {
    // 1. setup
    const body = {
      email: '',
      password: ''
    }

    // execute
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        // assertion
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body).toHaveProperty('msg', expect.arrayContaining([
          'Email required',
          'Password required',
          'Password atleast 6 characters'
        ]))
      })

      done()
  })
})