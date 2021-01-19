const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { hashingPassword } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const models = require('../models')

// let access_token = 'asda'
let access_token

beforeAll((done) => {
  queryInterface.bulkInsert('Users', [{
    email: 'admin@admin.com',
    password: hashingPassword('asdfasdf'),
    role: 'admin',
    username: 'admin ganteng'
  }])
  .then((admin) => {
    let payload = {
      id: admin.id,
      email: admin.email,
      username: admin.username
    }

    access_token = generateToken(payload)
    done()
  })
  .catch((error) => {
    done(error)
  })
})

afterAll((done) => {
  queryInterface.bulkDelete('Users')
  .then(() => {
    return queryInterface.bulkDelete('Products')
  })
  .then(() => {
    models.sequelize.close()
    done()
  })
  .catch((error) => {
    done(error)
  })
})


describe('Create product, POST /products', () => {
  // Success test case create product + login?
  it('if success should send response wiith 201 status code', (done) => {
    // 1. setup

    const body = {
      name: 'Buku Pintar JS',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/8/14/3750129/3750129_c9b535bd-307f-45a8-97ed-af4d8a0f2c98_700_700',
      price: 65000,
      stock: 50
    }


    // execute
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)


        // assertion
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')

        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toEqual('number')

        expect(res.body).toHaveProperty('name')
        expect(res.body.name).toEqual(body.name)
        expect(typeof res.body.name).toEqual('string')

        expect(res.body).toHaveProperty('image_url')
        expect(res.body.image_url).toEqual(body.image_url)
        expect(typeof res.body.image_url).toEqual('string')

        expect(res.body).toHaveProperty('price')
        expect(res.body.price).toEqual(body.price)
        expect(typeof res.body.price).toEqual('number')

        expect(res.body).toHaveProperty('stock')
        expect(res.body.stock).toEqual(body.stock)
        expect(typeof res.body.stock).toEqual('number')

        done()
      })


  })

  // it respon error access_token kosong
  it('if access_token nill should send response with 401 status code', (done) => {
    // 1. setup
    const body = {
      name: 'Buku Pintar JS',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/8/14/3750129/3750129_c9b535bd-307f-45a8-97ed-af4d8a0f2c98_700_700',
      price: 65000,
      stock: 50
    }

    // execute
    request(app)
      .post('/products')
      .set('access_token', '')
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        // assertion
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg', 'Jwt is not provided')
      })

      done()
  })

  // it respon error menyertakan access_token tp bkn pny admin
  it('if is not admin should send response with 401 status code', (done) => {
    // 1. setup
    const body = {
      name: 'Buku Pintar JS',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/8/14/3750129/3750129_c9b535bd-307f-45a8-97ed-af4d8a0f2c98_700_700',
      price: 65000,
      stock: 50
    }

    // execute
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        // assertion
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg', 'You dont have authorize')
      })

      done()
  })

  // it respon error bad requeest field yg required tdk di isi
  it('if is filled required not filled should send response with 400 status code', (done) => {
    // 1. setup
    const body = {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }

    // execute
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        // assertion
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body).toHaveProperty('msg', expect.arrayContaining([
          'Product name required',
          'Image required',
          'Price required',
          'Stock required',
        ]))
      })

      done()
  })

  // it respon error stock di isi angka minus
  it('if stock minus should send response with 400 status code', (done) => {
    // 1. setup
    const body = {
      name: 'Buku Pintar JS',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/8/14/3750129/3750129_c9b535bd-307f-45a8-97ed-af4d8a0f2c98_700_700',
      price: 65000,
      stock: -1
    }

    // execute
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        // assertion
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body).toHaveProperty('msg', 'Stock must be greater than 0')
      })

      done()
  })

  // it respon error price di isi angka minus
  it('if price minus should send response with 400 status code', (done) => {
    // 1. setup
    const body = {
      name: 'Buku Pintar JS',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/8/14/3750129/3750129_c9b535bd-307f-45a8-97ed-af4d8a0f2c98_700_700',
      price: -1000,
      stock: 5
    }

    // execute
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        // assertion
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body).toHaveProperty('msg', 'Price must be greater than 0')
      })

      done()
  })

  // it respon error field di isi tipe data yg tak sesuai (misal stock di isi string)
  it('if field wrong data type should send response with 400 status code', (done) => {
    // 1. setup
    const body = {
      name: 'Buku Pintar JS',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/8/14/3750129/3750129_c9b535bd-307f-45a8-97ed-af4d8a0f2c98_700_700',
      price: '@@',
      stock: '!!'
    }

    // execute
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        // assertion
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body).toHaveProperty('msg', expect.arrayContaining([
          'Price must be number',
          'Stock must be number'
        ]))
      })

      done()
  })

})

describe('Delete product, POST /products', () => {

})
