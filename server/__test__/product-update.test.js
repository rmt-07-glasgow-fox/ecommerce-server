const request = require('supertest')
const { clearProducts, generateToken } = require('../helpers')
const { Product, sequelize } = require('../models')
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
      console.log(res.body.id);
      productId = res.body.id
      done()
    })
})

afterAll(done => {
  clearProducts()
  .then(() => {
    sequelize.close()
    done()
  })
})

describe('PUT /products ==> Success', () => {
  it('Success update product, return 200 status code', (done) => {
    const body = {
      name: "Adidas Runing",
      image_url: "https://assets.adidas.com/images/w_320,f_auto,q_auto:sensitive,fl_lossy/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_White_M20324_01_standard.jpg",
      price: 3000000,
      stock: 5
    }
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(typeof res).toEqual('object')
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
        done()
      })
  })
})


describe('PUT /products ==> Failed', () => {
  it('Without passing access token, return 400 status code', (done) => {
    const body = {
      name: "Adidas Runing",
      image_url: "https://assets.adidas.com/images/w_320,f_auto,q_auto:sensitive,fl_lossy/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_White_M20324_01_standard.jpg",
      price: 3000000,
      stock: 5
    }
    request(app)
      .put(`/products/${productId}`)
      .send(body)
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
    const body = {
      name: "Adidas Runing",
      image_url: "https://assets.adidas.com/images/w_320,f_auto,q_auto:sensitive,fl_lossy/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_White_M20324_01_standard.jpg",
      price: 3000000,
      stock: 5
    }
    request(app)
      .put(`/products/${productId}`)
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
      name: "",
      image_url: "https://assets.adidas.com/images/w_320,f_auto,q_auto:sensitive,fl_lossy/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_White_M20324_01_standard.jpg",
      price: "",
      stock: 5
    }
    request(app)
      .put(`/products/${productId}`)
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
      name: "New Balance",
      image_url: "https://assets.adidas.com/images/w_320,f_auto,q_auto:sensitive,fl_lossy/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_White_M20324_01_standard.jpg",
      price: 'bukan number',
      stock: 7
    }
    request(app)
      .put(`/products/${productId}`)
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
      name: "New Balance",
      image_url: "https://assets.adidas.com/images/w_320,f_auto,q_auto:sensitive,fl_lossy/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_White_M20324_01_standard.jpg",
      price: 700000,
      stock: -7
    }
    request(app)
      .put(`/products/${productId}`)
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
      name: "New Balance",
      image_url: "https://assets.adidas.com/images/w_320,f_auto,q_auto:sensitive,fl_lossy/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_White_M20324_01_standard.jpg",
      price: -700000,
      stock: 7
    }
    request(app)
      .put(`/products/${productId}`)
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