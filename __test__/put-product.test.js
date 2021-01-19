const request = require('supertest')
const app = require('../app')
const { User, Product } = require('../models')
const { generateToken } = require('../helpers/jwt')
const clearProducts = require('./helpers/clear-products')
const models = require('../models')

describe('PUT /products API should be working', function() {
  let access_token
  let user
  let newProduct
  
  beforeAll(done => {
    User.findOne({where: {email: 'admin@mail.com'}})
      .then(result => {
        let newProd = {
          name: 'Boneka Barbie',
          image_url: 'google.com',
          price: 10000,
          stock: 10,
        }
        user = result
        return Product.create(newProd)
      })
      .then(output => {
          newProduct = output
          const payload = { id: user.id, email: user.email }
          access_token = generateToken(payload)
          done()
      })
  })
// create dulu, ambil id dari create product

  afterAll(done => {
    clearProducts()
    .then(function() {
      models.sequelize.close()
      done()
    })
    .catch(console.log)
  })
  
  it('should response with 200 status code', function(done) {
    let body = {
      name: 'JBL Endurance Run - Putih',
      image_url: 'https://ecs7.tokopedia.net/img/cache/900/product-1/2020/9/29/910865/910865_a716d488-44e5-41b8-a9bb-d7cdf8e9c2c4_2048_2048',
      price: 100000,
      stock: 25,
    }

    request(app)
      .put(`/products/${newProduct.id}`)
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res) {
        if(err) done(err)

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toEqual('number')
        expect(res.body).toHaveProperty('name')
        expect(res.body.name).toEqual(body.name)
        expect(res.body).toHaveProperty('image_url')
        expect(res.body.image_url).toEqual(body.image_url)
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('stock')
        expect(res.body.stock).toEqual(body.stock)

        done()
      })
  })

  it ('should response with 400 status code when name is empty', function(done) {
    const body = {
      name: '',
      image_url: 'https://ecs7.tokopedia.net/img/cache/900/product-1/2020/9/29/910865/910865_a716d488-44e5-41b8-a9bb-d7cdf8e9c2c4_2048_2048',
      price: 150000,
      stock: 50,
    }

    request(app)
      .put(`/products/${newProduct.id}`)
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Product name is required'])
        )

        done()
      })
  })

  it ('should response with 400 status code when stock is negative', function(done) {
    const body = {
      name: 'JBL Endurance Run - Hitam',
      image_url: 'https://ecs7.tokopedia.net/img/cache/900/product-1/2020/9/29/910865/910865_a716d488-44e5-41b8-a9bb-d7cdf8e9c2c4_2048_2048',
      price: 150000,
      stock: -50,
    }

    request(app)
      .put(`/products/${newProduct.id}`)
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Stock must be greater than 0'])
        )

        done()
      })
  })

  it ('should response with 400 status code when price is negative', function(done) {
    const body = {
      name: 'JBL Endurance Run - Hitam',
      image_url: 'https://ecs7.tokopedia.net/img/cache/900/product-1/2020/9/29/910865/910865_a716d488-44e5-41b8-a9bb-d7cdf8e9c2c4_2048_2048',
      price: -30,
      stock: 50,
    }

    request(app)
      .put(`/products/${newProduct.id}`)
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Price must be greater than 0'])
        )

        done()
      })
  })

  it ('should response with 404 when product is not found', function(done) {
    const body = {
      name: 'JBL Endurance Run - Hitam',
      image_url: 'https://ecs7.tokopedia.net/img/cache/900/product-1/2020/9/29/910865/910865_a716d488-44e5-41b8-a9bb-d7cdf8e9c2c4_2048_2048',
      price: 10000,
      stock: 50,
    }

    request(app)
      .put(`/products/100000`)
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual(`resource not found`)

        done()
      })
  })

  it ('should response with 401 when jwt is not provided', function(done) {
    const body = {
      name: 'JBL Endurance Run - Hitam',
      image_url: 'https://ecs7.tokopedia.net/img/cache/900/product-1/2020/9/29/910865/910865_a716d488-44e5-41b8-a9bb-d7cdf8e9c2c4_2048_2048',
      price: 150000,
      stock: 50,
    }

    request(app)
      .put(`/products/${newProduct.id}`)
      .send(body)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual(`JWT must be provided`)

        done()
      })
  })

})
