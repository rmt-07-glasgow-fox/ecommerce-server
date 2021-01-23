const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')

describe('POST /products API should be working', function() {
  let access_token

  beforeAll(done => {
    User.findOne({where: {email: 'admin@mail.com'}})
      .then(user => {
        const payload = { id: user.id, email: user.email }
        access_token = generateToken(payload)
        done()
      })
  })
  
  it('should response with 201 status code', function(done) {
    let body = {
      name: 'JBL Endurance Run - Hitam',
      image_url: 'https://ecs7.tokopedia.net/img/cache/900/product-1/2020/9/29/910865/910865_a716d488-44e5-41b8-a9bb-d7cdf8e9c2c4_2048_2048',
      price: 150000,
      stock: 50,
      category: 'headset'
    }

    request(app)
      .post('/products')
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res) {
        if(err) done(err)

        // Assert
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toEqual('number')
        expect(res.body).toHaveProperty('name')
        expect(res.body.name).toEqual(body.name)
        expect(res.body).toHaveProperty('image_url')
        expect(res.body.image_url).toEqual(body.image_url)
        expect(res.body).toHaveProperty('price')
        expect(res.body.price).toEqual(body.price)
        expect(res.body).toHaveProperty('stock')
        expect(res.body.stock).toEqual(body.stock)
        expect(res.body).toHaveProperty('category')
        expect(res.body.category).toEqual(body.category)

        done()
      })
  })

  it ('should response with 400 status code when name is empty', function(done) {
    const body = {
      name: '',
      image_url: 'https://ecs7.tokopedia.net/img/cache/900/product-1/2020/9/29/910865/910865_a716d488-44e5-41b8-a9bb-d7cdf8e9c2c4_2048_2048',
      price: 150000,
      stock: 50,
      category: 'headset'
    }

    request(app)
      .post('/products')
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
      category: 'headset'
    }

    request(app)
      .post('/products')
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
      category: 'headset'
    }

    request(app)
      .post('/products')
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

  it ('should response with 401 when jwt is not provided', function(done) {
    const body = {
      name: 'JBL Endurance Run - Hitam',
      image_url: 'https://ecs7.tokopedia.net/img/cache/900/product-1/2020/9/29/910865/910865_a716d488-44e5-41b8-a9bb-d7cdf8e9c2c4_2048_2048',
      price: 150000,
      stock: 50,
      category: 'headset'
    }

    request(app)
      .post('/products')
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
