const request = require('supertest')
const app = require('../../app')
const { generateToken } = require('../../helpers/jwt')
const { sequelize, User, Product } = require('../../models')
const { queryInterface } = sequelize

// Get access_token
let access_token_admin = ''
let access_token_user = ''
let dataProduct = [
  { 
    name: 'Cloths Adidas',
    image_url: 'url.jpg',
    price: 12000, stock: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
let id_product = ''

beforeAll(done => {
  User.findOne({ where: { email: 'admin@mail.com' } })
    .then(user => {
      const { id, name, email, role } = user
      access_token_admin = generateToken({ id, name, email, role })
      return User.findOne({ where: { email: 'user@mail.com' } })
    })
    .then(user => {
      const { id, name, email, role } = user
      access_token_user = generateToken({ id, name, email, role })
      return queryInterface.bulkInsert('Products', dataProduct, {} )
    })
    .then(() => {
      return Product.findAll({ limit: 1 })
    })
    .then(products => {
      id_product = products[0].dataValues.id
      done()
    })
    .catch(done)
})
// end

describe('DELETE /products', () => {
  describe('Success', () => {
    test('Delete product success', (done) => {
      request(app)
        .delete('/products/'+id_product)
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', 'Product success deleted!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('Failed', () => {
    test('Access token not exist, must login first!', (done) => {
      request(app)
        .put('/products/'+id_product)
        .set('Accept', 'application/json')
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'Please login first!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    test('Access token exist, but not admin!', (done) => {
      request(app)
        .put('/products/'+id_product)
        .set('Accept', 'application/json')
        .set('access_token', access_token_user)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(403)
          expect(body).toHaveProperty('message', 'You dont have access!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    test('Data Not Found', (done) => {
      request(app)
        .delete('/products/'+id_product)
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(404)
          expect(body).toHaveProperty('message', 'Product Not Found')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})
