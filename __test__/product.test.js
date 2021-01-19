const request = require('supertest')
const app = require('../app')
const clearUsers = require('./helpers/clearUsers')
const clearProducts = require('./helpers/clearProducts')
const seedProducts = require('./helpers/seedProducts')
const seedUsers = require('./helpers/seedUsers')
const models = require('../models/')
const { Product, User } = require('../models/')
const { createToken, verifyToken } = require('../helpers/jwt')


let access_token_admin = null
let access_token_customer = null

beforeAll((done) => {
  seedUsers()
    .then(users => {
      users.forEach(user => {
        if (user.role === 'customer') {
          const payload = {
            id: user.id,
            email: user.email,
            role: user.role
          }
          access_token_customer = createToken(payload)
        } else {
          const payload = {
            id: user.id,
            email: user.email,
            role: user.role
          }
          access_token_admin = createToken(payload)
        }
      })
      seedProducts()
    })
    .then(() => {
      done()
    })
    .catch(console.log)
})


afterAll((done) => {
  clearUsers()
    .then(() => {
      clearProducts()
    })
    .then(() => {
      models.sequelize.close()
      done()
    })
    .catch(console.log)
})

describe('POST /products', () => {
  it('should send response with 201 status code', (done) => {
    // Setup
    const body = {
      name: 'nice headphones',
      image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
      price: 200000,
      stock: 5
    }
    // Execute
    request(app)
      .post('/products')
      .set('access_token', access_token_admin)
      .send(body)
      .end((err, res) => {
        //err from supertest
        if (err) done(err)

        // Assert

        // check the data in the db
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')

        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toEqual('number')

        expect(res.body).toHaveProperty('name')
        expect(typeof res.body.name).toEqual('string')
        expect(res.body.name).toEqual(body.name)

        expect(res.body).toHaveProperty('image_url')
        expect(typeof res.body.image_url).toEqual('string')
        expect(res.body.image_url).toEqual(body.image_url)

        expect(res.body).toHaveProperty('price')
        expect(typeof res.body.price).toEqual('number')
        expect(res.body.price).toEqual(body.price)

        expect(res.body).toHaveProperty('stock')
        expect(typeof res.body.stock).toEqual('number')
        expect(res.body.stock).toEqual(body.stock)

        done()

      })
  })

  it.only('should send response with 401 status code - no access_token', (done) => {
    // Setup
    const body = {
      name: 'nice headphones',
      image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
      price: 200000,
      stock: 5
    }
    // Execute
    request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        //err from supertest
        if (err) done(err)

        // Assert
        // check the data in the db
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')

        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Not authorised'])
        )

        done()
      })
  })

  it('should send response with 400 status code', (done) => {
    // Setup
    const body = {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
    // Execute
    request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        //err from supertest
        if (err) done(err)

        // check the data in the db
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Name required', 'Image_url required', 'Price required', 'Stock required'])
        )

        done()
      })
  })

  it('should send response with 400 status code - natural number for price and stock', (done) => {
    const body = {
      name: 'nice headphones',
      image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
      price: -120000,
      stock: -5
    }

    // Execute
    request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        //err from supertest
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Price must be greater than zero', 'Stock must be greater than zero'])
        )

        done()
      })
  })

  it('should send response with 400 status code - invalid data types for price and stock', (done) => {
    const body = {
      name: 'nice headphones',
      image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
      price: 'yeyeyeye',
      stock: 'testing'
    }

    // Execute
    request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        //err from supertest
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Price must be a valid number', 'Stock must be a valid number'])
        )

        done()
      })
  })

  it('should send response with 400 status code - invalid data types for name', (done) => {
    const body = {
      name: 10000,
      image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
      price: 120000,
      stock: 5
    }

    // Execute
    request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        //err from supertest
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Name must contain only alphanumeric characters'])
        )

        done()
      })
  })

  it('should send response with 400 status code - invalid data types for image_url', (done) => {
    const body = {
      name: 'nice headphones',
      image_url: 'wkwkwkwkwk',
      price: 120000,
      stock: 5
    }

    // Execute
    request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        //err from supertest
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Image_url must contain a url'])
        )

        done()
      })
  })
})


describe('PUT /products/:id', () => {
  it('should send response with 200 status code', (done) => {
    // Setup
    const body = {
      stock: 3,
      price: 200000
    }

    return Product.findOne({
      where: {
        name: 'nice headphones'
      }
    })
      .then(product => {
        const id = product.id
        // Execute
        request(app)
          .put(`/products/${id}`)
          .send(body)
          .end((err, res) => {
            //err from supertest
            if (err) done(err)

            // Assert

            // check the data in the db
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')

            expect(res.body).toHaveProperty('price')
            expect(typeof res.body.price).toEqual('number')
            expect(res.body.price).toEqual(body.price)

            expect(res.body).toHaveProperty('stock')
            expect(typeof res.body.stock).toEqual('number')
            expect(res.body.stock).toEqual(body.stock)

            done()
          })
      })
      .catch(console.log)
  })

  it('should send response with 400 status code', (done) => {
    // Setup
    const body = {
      price: -10,
      stock: -10,
      name: 'nice headphones',
      image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg'
    }

    return Product.findOne({
      where: {
        name: 'nice headphones'
      }
    })
      .then(product => {
        const id = product.id

        // Execute
        request(app)
          .put(`/products/${id}`)
          .send(body)
          .end((err, res) => {
            if (err) done(err)

            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toEqual(true)
            expect(res.body.errors).toEqual(
              expect.arrayContaining(['Price must be greater than zero', 'Stock must be greater than zero'])
            )

            done()
          })
      })
      .catch(console.log)
  })

  it('should send response with 400 status code - invalid data types for price and stock', (done) => {
    const body = {
      price: 'yeyeyeye',
      stock: 'testing',
      name: 'nice headphones',
      image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg'
    }

    return Product.findOne({
      where: {
        name: 'nice headphones'
      }
    })
      .then(product => {
        const id = product.id

        // Execute
        request(app)
          .put(`/products/${id}`)
          .send(body)
          .end((err, res) => {
            //err from supertest
            if (err) done(err)

            // Assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toEqual(true)
            expect(res.body.errors).toEqual(
              expect.arrayContaining(['Price must be a valid number', 'Stock must be a valid number'])
            )

            done()
          })
      })
      .catch(console.log)
  })

  it('should send response with 400 status code - invalid data types for name', (done) => {
    const body = {
      name: 10000,
      image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
      price: 120000,
      stock: 5
    }

    return Product.findOne({
      where: {
        name: 'nice headphones'
      }
    })
      .then(product => {
        const id = product.id
        request(app)
          .put(`/products/${id}`)
          .send(body)
          .end((err, res) => {
            //err from supertest
            if (err) done(err)

            // Assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toEqual(true)
            expect(res.body.errors).toEqual(
              expect.arrayContaining(['Name must contain only alphanumeric characters'])
            )

            done()
          })
      })
      .catch(console.log)
  })

  it('should send response with 400 status code - invalid data types for image_url', (done) => {
    const body = {
      name: 'nice headphones',
      image_url: 'wkwkwkwkwk',
      price: 120000,
      stock: 5
    }

    return Product.findOne({
      where: {
        name: 'nice headphones'
      }
    })
      .then(product => {
        const id = product.id
        // Execute
        request(app)
          .put(`/products/${id}`)
          .send(body)
          .end((err, res) => {
            //err from supertest
            if (err) done(err)

            // Assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toEqual(true)
            expect(res.body.errors).toEqual(
              expect.arrayContaining(['Image_url must contain a url'])
            )

            done()
          })
      })
      .catch(console.log)
  })
})



