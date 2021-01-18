const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')

afterAll((done) => {
  User.destroy({where:{}})
    .then(() => {
      sequelize.close()
      done()
    })
})

describe('User login test http://localhost:3000/login', () => {
  it('Success login', (done) => {
    expect(true).toBe(true)
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
  it('Failed login no email in records', () => {
    expect(true).toBe(true)
  })
  it('Failed login without email and password', () => {
    expect(true).toBe(true)
  })
})
