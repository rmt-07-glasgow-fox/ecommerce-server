const request = require('supertest')
const app = require('../../app')
const { generateToken } = require('../../helpers/jwt')
const { sequelize, User } = require('../../models')
const { queryInterface } = sequelize

// get access token
let access_token_admin = ''
let access_token_user = ''

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
      done()
    })
    .catch(done)
})
// end

afterAll(done => {
  queryInterface.bulkDelete('Products')
    .then(() => {
      done()
    })
    .catch(done)
})

describe('POST /products', () => {
  const dataProduct = { name: 'Cloths Adidas', image_url: 'url.jpg', price: 12000, stock: 10, CategoryId: 1 }
  const dataProductNoCategory = { name: 'Cloths Adidas', image_url: 'url.jpg', price: 12000, stock: 10, CategoryId: 0 }
  const emptyDataProduct = { name: '', image_url: '', price: '', stock: '' }
  const dataMinusStock = { name: 'Cloths Adidas', image_url: 'url.jpg', price: 12000, stock: -10, CategoryId: 1 }
  const dataMinusPrice = { name: 'Cloths Adidas', image_url: 'url.jpg', price: -12000, stock: 10, CategoryId: 1 }
  const dataNotValidType = { name: 1000, image_url: 1000, price: 'String', stock: 'String', CategoryId: 1 }

  describe('Create product success', () => {
    test('Create product success', (done) => {
      request(app)
        .post('/products')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(dataProduct)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('name', dataProduct.name)
          expect(body).toHaveProperty('image_url', dataProduct.image_url)
          expect(body).toHaveProperty('stock', dataProduct.stock)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('Create product failed', () => {
    test('Foreign key not exist!', (done) => {
      request(app)
        .post('/products')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(dataProductNoCategory)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Failed! Foreign key not exist')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    test('Access token not exist, must login first!', (done) => {
      request(app)
        .post('/products')
        .set('Accept', 'application/json')
        .send(dataProduct)
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
        .post('/products')
        .set('Accept', 'application/json')
        .set('access_token', access_token_user)
        .send(dataProduct)
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
    test('Field is empty', (done) => {
      request(app)
        .post('/products')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(emptyDataProduct)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 
            expect.arrayContaining([
              'Name cannot be empty!',
              'Image cannot be empty!',
              'Price cannot be empty!',
              'Stock cannot be empty!'
            ]))
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    test('Stock is minus', (done) => {
      request(app)
        .post('/products')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(dataMinusStock)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 
            expect.arrayContaining([
              'Stock cannot less than 0'
            ]))
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    test('Price is minus', (done) => {
      request(app)
        .post('/products')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(dataMinusPrice)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 
            expect.arrayContaining([
              'Price cannot less than 0'
            ]))
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    test('Data type is not valid', (done) => {
      request(app)
        .post('/products')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(dataNotValidType)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 
            expect.arrayContaining([
              'Price only allow number!',
              'Stock only allow number!'
            ]))
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})
