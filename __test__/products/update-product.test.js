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


describe('PUT /products', () => {
  const dataProductUpdate = { name: 'Cloths', image_url: 'url_update.jpg', price: 10000, stock: 20 }
  const emptyDataProduct = { name: '', image_url: '', price: '', stock: '' }
  const dataMinusStock = { name: 'Cloths Adidas', image_url: 'url.jpg', price: 12000, stock: -10 }
  const dataMinusPrice = { name: 'Cloths Adidas', image_url: 'url.jpg', price: -12000, stock: 10 }
  const dataNotValidType = { name: 1000, image_url: 1000, price: 'String', stock: 'String' }

  describe('Success', () => {
    test('Update product success', (done) => {
      request(app)
        .put('/products/'+id_product)
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(dataProductUpdate)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          console.log(body.id,'???');
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('name', dataProductUpdate.name)
          expect(body).toHaveProperty('image_url', dataProductUpdate.image_url)
          expect(body).toHaveProperty('stock', dataProductUpdate.stock)
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
        .send(dataProductUpdate)
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
        .send(dataProductUpdate)
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
        .put('/products/'+id_product)
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
        .put('/products/'+id_product)
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
        .put('/products/'+id_product)
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
        .put('/products/'+id_product)
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
