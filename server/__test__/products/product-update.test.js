const request = require('supertest')
const { clearCategory, generateToken } = require('../../helpers')
const { Category, Product, sequelize } = require('../../models')
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

beforeAll(done => {
  access_token = generateToken(admin_account)
  access_token2 = generateToken(fake_account)
  Category.create({
    "id": 1,
    "name": "sepatu",
    "UserId": 1
  }).then(() => {
    return Product.create({
      "id": 1,
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": 1,
      "UserId": 1
    })
  }).then(data => {
    done()
  })
})

afterAll(done => {
  clearCategory()
  .then(() => {
    sequelize.close()
    done()
  })
})

describe('PUT /products ==> Success', () => {
  it('Success update product, return 200 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": 1
    }
    request(app)
      .put(`/products/1`)
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(typeof res).toEqual('object')
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


describe('PUT /products ==> Failed', () => {
  it('Without passing access token, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": 1
    }
    request(app)
      .put(`/products/1`)
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

  it('Invalid access token, return 401 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": 1
    }
    request(app)
      .put(`/products/1`)
      .set('access_token', access_token2)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })

  it('Required column not filled, return 400 status code', (done) => {
    const body = {
      "name": "",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": 1
    }
    request(app)
      .put(`/products/1`)
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
      "price": "Sepuluh juta",
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": 1
    }
    request(app)
      .put(`/products/1`)
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
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": 1
    }
    request(app)
      .put(`/products/1`)
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
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": 1
    }
    request(app)
      .put(`/products/1`)
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

  it('Invalid product Id, return 404 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": 1
    }
    request(app)
      .put(`/products/100`)
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})