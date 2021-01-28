const request = require('supertest')
const app = require('../app')
const { generateToken, verifyToken } = require('../helpers/jwtHelper')
const { Product, User, sequelize } = require('../models')
const encrypt = require('../helpers/bcryptHelper').encrypt

const adminData = {
  id: 1,
  email: 'admin@mail.com',
  role: 'admin'
}
const customerData = {
  id: 2,
  email: 'sadKEK@mail.com',
  role: 'customer'
}

let admin_token
let customer_token
let productId


describe('Product CRUD test http://localhost:3000/products', () => {

  beforeAll((done) => {
    admin_token = generateToken(adminData)
    customer_token = generateToken(customerData)
    sequelize.queryInterface.bulkInsert('Users', [
      {
        email: 'admin@mail.com',
        password: encrypt('1234'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sadKEK@mail.com',
        password: encrypt('1234'),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
      .then(_ => {
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })
  
  afterAll((done) => {
    if(process.env.NODE_ENV === 'test'){
      Product.destroy({where:{}})
      .then(() => {
        return User.destroy({where:{}})
      })
      .then(() => {
        sequelize.close()
        done()
      })
    }
  })

  describe('Add Product test http://localhost:3000/products', () => {

    it('Success add new product', (done) => {
      request(app)
        .post('/products')
        .set('access_token', admin_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: 120000,
          stock: 69420,
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.statusCode).toEqual(201)
          productId = res.body.data.id
          done()
        })
    })

    it('Failed add new product without access_token', (done) => {
      request(app)
        .post('/products')
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: 120000,
          stock: 69420,
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.statusCode).toEqual(403)
          expect(res.body).toHaveProperty('message')
          done()
        })
    })

    it('Failed add new product with access_token but not admin', (done) => {
      request(app)
        .post('/products')
        .set('access_token', customer_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: 120000,
          stock: 69420,
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.statusCode).toEqual(403)
          expect(res.body).toHaveProperty('message')
          done()
        })
    })
    
    it('Failed add new product with empty field', (done) => {
      request(app)
        .post('/products')
        .set('access_token', admin_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "",
          image_url:"",
          price: "",
          stock: "",
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('errors')
          expect(res.statusCode).toEqual(500)
          done()
        })
    })

    it('Failed add new product with price = negative', (done) => {
      request(app)
        .post('/products')
        .set('access_token', admin_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: -2,
          stock: 69420,
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('errors')
          expect(res.statusCode).toEqual(500)
          done()
        })
    })

    it('Failed add new product with stock = negative', (done) => {
      request(app)
        .post('/products')
        .set('access_token', admin_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: 120002,
          stock: -694,
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('errors')
          expect(res.statusCode).toEqual(500)
          done()
        })
    })

    it('Failed add new product with price and stock = string', (done) => {
      request(app)
        .post('/products')
        .set('access_token', admin_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: "allo",
          stock: "test",
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('errors')
          expect(res.statusCode).toEqual(500)
          done()
        })
    })  
  })

  describe('Edit Product test http://localhost:3000/products', () => {
    it('Success edit a product', (done) => {
      request(app)
        .put(`/products/${productId}`)
        .set('access_token', admin_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu compass",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: 100000,
          stock: 420,
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('message')
          expect(res.statusCode).toEqual(200)
          done()
        })
    })

    it('Failed edit a product with access_token but not admin', (done) => {
      request(app)
        .put(`/products/${productId}`)
        .set('access_token', customer_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu compass",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: 100000,
          stock: 420,
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('message')
          expect(res.statusCode).toEqual(403)
          done()
        })
    })

    it('Failed edit a product without access_token', (done) => {
      request(app)
        .post('/products')
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: 120000,
          stock: 69420,
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.statusCode).toEqual(403)
          expect(res.body).toHaveProperty('message')
          done()
        })
    })

    it('Failed edit a product with stock = negative', (done) => {
      request(app)
        .put(`/products/${productId}`)
        .set('access_token', admin_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: 120002,
          stock: -694,
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('errors')
          expect(res.statusCode).toEqual(500)
          done()
        })
    })

    it('Failed edit a product with stock = negative', (done) => {
      request(app)
        .put(`/products/${productId}`)
        .set('access_token', admin_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: 120002,
          stock: -694,
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('errors')
          expect(res.statusCode).toEqual(500)
          done()
        })
    })

    it('Failed edit a product with price and stock = string', (done) => {
      request(app)
        .put(`/products/${productId}`)
        .set('access_token', admin_token)
        .set('Content-Type', 'application/json')
        .send({
          name: "sepatu",
          image_url:"https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
          price: "allo",
          stock: "test",
          // UserId: verifyToken(admin_token).id
        })
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('errors')
          expect(res.statusCode).toEqual(500)
          done()
        })
    })
  })

  describe('Delete Product test http://localhost:3000/products', () => {
    it('Success delete a product', (done) => {
      request(app)
        .delete(`/products/${productId}`)
        .set('access_token', admin_token)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('message')
          expect(res.statusCode).toEqual(200)
          done()
        })
    })
    
    it('Failed delete a product without access_token', (done) => {
      request(app)
        .delete(`/products/${productId}`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('message')
          expect(res.statusCode).toEqual(403)
          done()
        })
    })

    it('Failed delete a product with access_token but not admin', (done) => {
      request(app)
        .delete(`/products/${productId}`)
        .set('access_token', customer_token)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if(err) done(err)
          expect(res.body).toHaveProperty('message')
          expect(res.statusCode).toEqual(403)
          done()
        })
    })
  })
  
})