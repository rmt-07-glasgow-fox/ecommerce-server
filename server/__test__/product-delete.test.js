const request = require('supertest')
const { generateToken } = require('../helpers')
const { sequelize } = require('../models')
const app = require('../app')
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
let productId

beforeAll(done => {
  access_token = generateToken(admin_account)
  access_token2 = generateToken(fake_account)
  const body = {
    name: "Adidas Tennis Shoes",
    image_url: "https://assets.adidas.com/images/w_320,f_auto,q_auto:sensitive,fl_lossy/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_White_M20324_01_standard.jpg",
    price: 5000000,
    stock: 10
  }
  request(app)
    .post('/products')
    .set('access_token', access_token)
    .send(body)
    .end((err, res) => {
      if(err) done(err)
      productId = res.body.id
      done()
    })
})

afterAll(done => {
  sequelize.close()
  done()
})


describe('DELETE /products ==> Success', () => {
  it('Success delete product, return 200 status code', (done) => {
    console.log(productId);
    request(app)
      .delete(`/products/${productId}`)
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
      .delete(`/products/${productId}`)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })

  it('Invalid access token, return 401 status code', (done) => {
    request(app)
      .put(`/products/${productId}`)
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
})