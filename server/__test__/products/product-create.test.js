const request = require('supertest')
const { clearCategory, generateToken } = require('../../helpers')
const { sequelize, Category } = require('../../models')
const app = require('../../app')
const admin_account = {
  id: 1,
  email: 'admin@gmail.com'
}
const fake_account = {
  id:2,
  email: 'bukanadmin@gmail.com'
}
let access_token
let access_token2

afterAll(done => {
  clearCategory()
  .then(() => {
    sequelize.close()
    done()
  })
})

beforeAll(done => {
  access_token = generateToken(admin_account)
  access_token2 = generateToken(fake_account)
  Category.create({
    "id": 1,
    "name": "sepatu",
    "UserId": 1
  }).then(() => {
    done()
  })
})

describe('POST /products ==> Success', () => {
  it('Success add product, return 201 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": 1
    }
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body.name).toEqual(body.name)
        expect(res.body).toHaveProperty('image_url')
        expect(res.body.image_url).toEqual(body.image_url)
        expect(res.body).toHaveProperty('price')
        expect(res.body.price).toEqual(body.price)
        expect(res.body).toHaveProperty('stock')
        expect(res.body.stock).toEqual(body.stock)
        expect(res.body).toHaveProperty('description')
        expect(res.body.description).toEqual(body.description)
        expect(res.body).toHaveProperty('CategoryId')
        expect(res.body.CategoryId).toEqual(body.CategoryId)
        done()
      })
  })
})

describe('POST /products ==> Failed', () => {
  it('Without passing access token, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": 1
    }
    request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Invalid access token, return 401 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": 1
    }
    request(app)
      .post('/products')
      .set('access_token', access_token2)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Required column not filled, return 400 status code', (done) => {
    const body = {
      "name": "",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": 1
    }
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Stock filled by minus number, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": -10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": 1
    }
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Price filled by minus number, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": -100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": 1
    }
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Invalid data type, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": "satu juta",
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": 1
    }
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message))
        done()
      })
  })
})