const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const encrypt = require('../helpers/bcryptHelper').encrypt

beforeAll((done) => {
  sequelize.queryInterface.bulkInsert('Users', [
    {
      email: 'admin@mail.com',
      password: encrypt('1234'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
    .then(_ => {
      done()
    })
    .catch(err => {
      console.log(err)
      done(err)
    })
})

afterAll((done) => {
  User.destroy({where:{}})
    .then(() => {
      sequelize.close()
      done()
    })
})

describe('User login test http://localhost:3000/login', () => {
  it('Success login', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'admin@mail.com',
        password: '1234'
      })
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('access_token')
        expect(res.body).toHaveProperty('email')
        done()
      })
  })
  it('Failed login without email in records', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'allo@allo.com',
        password: '1234'
      })
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('message')
        done()
      })
  })
  it('Failed login without email and password', (done) => {
    request(app)
      .post('/login')
      .send({
        email: '',
        password: ''
      })
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('message')
        done()
      })
  })
})
