const request = require('supertest')

const app = require('../../app')

const loginAdmin = () => {
  if (process.env.NODE_ENV === 'test') {
    let body = {
      email: 'admin@mail.com',
      password: '123456'
    }

    return request(app)
      .post('/login')
      .send(body)
  }
}

const loginCustomer = () => {
  if (process.env.NODE_ENV === 'test') {
    let body = {
      email: 'user@mail.com',
      password: '123456'
    }

    return request(app)
      .post('/login')
      .send(body)
  }
}

module.exports = {
  loginAdmin,
  loginCustomer
}
