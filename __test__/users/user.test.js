const request = require('supertest')
const app = require('../../app')
const { sequelize } = require('../../models')
const { queryInterface } = sequelize

afterAll(done => {
  queryInterface.bulkDelete('Users')
    .then(() => {
      done()
    })
    .catch(done)
})

describe('POST /register', () => {
  const userValid = { name: 'Hani', email: 'hanii@gmail.com', password: '123456', role: 'admin'}
  describe('Success', () => {
    test('Register Success', (done) => {
      request(app)
        .post('/register')
        .set('Accept', 'application/json')
        .send(userValid)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('name', userValid.name)
          expect(body).toHaveProperty('email', userValid.email)
          expect(body).toHaveProperty('role', userValid.role)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})

describe('POST /login', () => {
  describe('Success', () => {
    test('Login Success', (done) => {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({ email: 'hanii@gmail.com', password: '123456'})
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('access_token', expect.any(String))
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('Failed', () => {
    test('failed login email exist with wrong password', (done) => {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({ email: 'hanii@gmail.com', password: 'wrong123456'})
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Email or password wrong!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    test('failed login email doesnt exist', (done) => {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({ email: 'wronghanii@gmail.com', password: '123456'})
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Email or password wrong!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    test('empty email or password', (done) => {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({ email: '', password: ''})
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Email or password cannot be empty!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})

