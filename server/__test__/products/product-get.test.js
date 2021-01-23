const request = require('supertest')
const { clearCategory, generateToken } = require('../../helpers')
const { sequelize, Product, Category } = require('../../models')
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
    return Product.create({
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": 1,
      "UserId": 1
    })
  }).then(() => {
    done()
  })
})

describe('GET /products ==> Success', () => {
  it('Success fetch all products, return 200 status code', (done) => {
    request(app)
      .get('/products')
      .set('access_token', access_token)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body))
        expect(res.body[0]).toHaveProperty('id')
        expect(res.body[0]).toHaveProperty('name')
        expect(res.body[0]).toHaveProperty('image_url')
        expect(res.body[0]).toHaveProperty('price')
        expect(res.body[0]).toHaveProperty('stock')
        expect(res.body[0]).toHaveProperty('description')
        expect(res.body[0]).toHaveProperty('UserId')
        expect(res.body[0]).toHaveProperty('CategoryId')
        expect(res.body[0]).toHaveProperty('Category')
        done()
      })
  })
})

describe('GET /products ==> Failed', () => {
  it('Without passing access token, return 400 status code', (done) => {
    request(app)
      .get('/products')
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })
})
