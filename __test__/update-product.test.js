const request = require('supertest')

const app = require('../app')
const insertProduct = require('./helpers/insert-product')
const { loginAdmin, loginCustomer } = require('./helpers/login')

const models = require('../models')

describe('PUT /products/:id', function () {
  let productId, access_token, customer_token

  beforeAll(function (done) {
    loginAdmin()
      .then(function (res) {
        access_token = res.body.access_token

        return insertProduct()
      })
      .then(product => {
        productId = product.id

        return loginCustomer()
      })
      .then(function (res) {
        customer_token = res.body.access_token

        done()
      })
      .catch(console.log)
  })

  afterAll(function(done) {
    models.sequelize.close()
    done()
  })

  describe('Success test case', function() {
    it('should return response 200 with product details', function(done) {
      // Setup
      const body = {
        name: 'Baju baru',
        description: 'Baju hitam naoki',
        category: 'Clothes',
        image_url: 'https://cdn.popmama.com/content-images/post/20191217/hc39468e5ceee44c49c892c0e334a111ehjpg-q50-e62609efe3386029018997c67b15976f_600xauto.jpeg',
        price: 150000,
        stock: 10
      }
      // Execute
      request(app)
        .put('/products/' + productId)
        .set('access_token', access_token)
        .send(body)
        .end(function(err, res) {
          if(err) done(err)

          // Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('name')
          expect(res.body.name).toEqual(body.name)
          expect(res.body).toHaveProperty('description')
          expect(res.body.description).toEqual(body.description)
          expect(res.body).toHaveProperty('category')
          expect(res.body.category).toEqual(body.category)
          expect(res.body).toHaveProperty('image_url')
          expect(res.body.image_url).toEqual(body.image_url)
          expect(res.body).toHaveProperty('price')
          expect(res.body.price).toEqual(body.price)
          expect(res.body).toHaveProperty('stock')
          expect(res.body.stock).toEqual(body.stock)

          done()
        })

    })
  })

  describe('Failed test case', function() {
    it('should return response 400 with error details', function(done) {
      // Setup
      const body = {
        name: '',
        description: '',
        category: '',
        image_url: '',
      }
      // Execute
      request(app)
        .put('/products/' + productId)
        .set('access_token', access_token)
        .send(body)
        .end(function(err, res) {
          if(err) done(err)

          // Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(['Name is required', 'Price is required', 'Stock is required'])
          )

          done()
        })
    })

    it('should return response 400 when stock and price is not numeric or less than 0', function(done) {
      // Setup
      const body = {
        name: 'A',
        description: '',
        category: 'A',
        image_url: 'http://locahost:3000/assets/1.jpg',
        price: 'adfe30',
        stock: -10
      }
      // Execute
      request(app)
        .put('/products/' + productId)
        .set('access_token', access_token)
        .send(body)
        .end(function(err, res) {
          if(err) done(err)

          // Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(['Price is required', 'Stock have to be greater than 0'])
          )

          done()
        })
    })

    it('should return response 401 with error details', function(done) {
      // Setup
      const body = {
        name: 'Baju baru',
        description: 'Baju hitam naoki',
        category: 'Clothes',
        image_url: 'https://cdn.popmama.com/content-images/post/20191217/hc39468e5ceee44c49c892c0e334a111ehjpg-q50-e62609efe3386029018997c67b15976f_600xauto.jpeg',
        price: 150000,
        stock: 10
      }
      // Execute
      request(app)
        .put('/products/' + productId)
        .send(body)
        .end(function(err, res) {
          if(err) done(err)

          // Assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toEqual('Please login first')

          done()
        })
    })

    it('should return response 403 with error details', function(done) {
      // Setup
      const body = {
        name: 'Baju baru',
        description: 'Baju hitam naoki',
        category: 'Clothes',
        image_url: 'https://cdn.popmama.com/content-images/post/20191217/hc39468e5ceee44c49c892c0e334a111ehjpg-q50-e62609efe3386029018997c67b15976f_600xauto.jpeg',
        price: 150000,
        stock: 10
      }
      //Execute
      request(app)
        .put('/products/' + productId)
        .set('access_token', customer_token)
        .send(body)
        .end(function(err, res) {
          if (err) done(err)
          // Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(typeof res.body.message).toEqual('string')
          expect(res.body.message).toEqual('You are not allowed')

          done()
        })
    })
  })
})
