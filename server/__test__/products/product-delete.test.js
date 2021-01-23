const request = require('supertest')
const { generateToken, clearCategory } = require('../../helpers')
const { sequelize, Category, Product } = require('../../models')
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


describe('DELETE /products ==> Success', () => {
  it('Success delete product, return 200 status code', (done) => {
    request(app)
      .delete(`/products/1`)
      .set('access_token', access_token)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})


describe('DELETE /products ==> Failed', () => {
  it('Without passing access token, return 400 status code', (done) => {
    request(app)
      .delete(`/products/1`)
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
    request(app)
      .delete(`/products/1`)
      .set('access_token', access_token2)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })

  it('Invalid productId, return 404 status code', (done) => {
    request(app)
      .delete(`/products/1000`)
      .set('access_token', access_token)
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