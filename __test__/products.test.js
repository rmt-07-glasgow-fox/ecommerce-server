const request = require('supertest');
const app = require('../app')

const { User, Product } = require('../models/index')
const { hashPassword, checkPassword} = require('../helpers/bcrypt')
const { generateToken, checkToken } = require('../helpers/jwt')
const models = require('../models/index')

// ***** INITIALIZE ***** //
let admin = {
  id: 10,
  email: "admin@mail.com",
  password: "qweqwe",
  role: "admin"
}
let customer = {
  id: 20,
  email: "customer@mail.com",
  password: "qweqwe",
  role: "customer"
}
let adminToken, customerToken, ProductId

// ***** SETUP ***** //
let payload = [
  {email: admin.email, password: admin.password, role: admin.role},
  {email: customer.email, password: customer.password, role: customer.role}
]

beforeAll((done) => {
  adminToken = generateToken(admin)
  customerToken = generateToken(customer)
  User.bulkCreate(payload)
  .then((data) => {
    done()
  })
  .catch((err) => {
    done(err)
  })
})

afterAll((done) => {
  if(process.env.NODE_ENV === 'test') {
    Product.destroy({where:{}})
    .then(() => {
      return User.destroy({where:{}})
    })
    .then(() => {
      models.sequelize.close()
      done()
    })
    .catch((err) => {
      done(err)
    })
  }
})


// ==================== CREATE ==================== //
describe('Create new product', function() {

  // ***** TEST ***** //
  it('Success create', function(done) {
    const payload = {
      name: "H8 T-shirt",
      image_url:"www.google.com",
      price: 85000,
      stock: 5,
      // UserId: checkToken(adminToken).id
    }
    request(app)
    .post('/products')
    .set('access_token', adminToken)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('Product created successfully!')
      ProductId = res.body.id
      done()
    })
  })


  it('Failed create a product without access token', function(done) {
    const payload = {
      name: "H8 T-shirt",
      image_url:"www.google.com",
      price: 85000,
      stock: 5,
      // UserId: checkToken(adminToken).id
    }
    request(app)
    .post('/products')
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(401)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('Please provide a token!')
      done()
    })
  })

  it('Failed create a product without admin\'s access token', function(done) {
    const payload = {
      name: "H8 T-shirt",
      image_url:"www.google.com",
      price: 85000,
      stock: 5,
      UserId: checkToken(customerToken).id
    }
    request(app)
    .post('/products')
    .set('access_token', customerToken)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(403)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('Need administrator authorization!')
      done()
    })
  })


  it('Failed create a product with empty string', function(done) {
    const payload = {
      name: "",
      image_url:"",
      price: 0,
      stock: 0,
      // UserId: checkToken(adminToken).id
    }
    request(app)
    .post('/products')
    .set('access_token', adminToken)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('message')
      done()
    })
  })

  it('Failed create a product with negative value in stock', function(done) {
    const payload = {
      name: "H8 T-shirt",
      image_url:"www.google.com",
      price: 85000,
      stock: -5,
      UserId: checkToken(customerToken).id
    }
    request(app)
    .post('/products')
    .set('access_token', adminToken)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual(
        expect.arrayContaining(['Stock must contains positive value!'])
      )
      done()
    })
  })


  it('Failed create a product with negative value in price', function(done) {
    const payload = {
      name: "H8 T-shirt",
      image_url:"www.google.com",
      price: -85000,
      stock: 5,
      UserId: checkToken(customerToken).id
    }
    request(app)
    .post('/products')
    .set('access_token', adminToken)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual(
        expect.arrayContaining(['Price must contains positive value!'])
      )
      done()
    })
  })


  it('Failed create a product with wrong values on stock and price', function(done) {
    const payload = {
      name: "H8 T-shirt",
      image_url:"www.google.com",
      price: "XXX",
      stock: "YYY",
      UserId: checkToken(customerToken).id
    }
    request(app)
    .post('/products')
    .set('access_token', adminToken)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual(
        expect.arrayContaining(['Price must contains integer value!', 'Stock must contains integer value!'])
      )
      done()
    })
  })
})

// // ==================== UPDATE ==================== //
describe('Update a product', function() {

  // **** TEST ***** //
  it('Success update', function(done) {
    const payload = {
      name: "H8 jackets UPDATED",
      image_url:"www.googleupdated.co.id",
      price: 285000,
      stock: 10,
      // UserId: checkToken(adminToken).id
    }
    request(app)
    .put(`/products/${ProductId}`)
    .set('access_token', adminToken)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(201)
      done()
    })
  })


  it('Failed update a product without access token', function(done) {
    const payload = {
      name: "H8 jackets UPDATED",
      image_url:"www.googleupdated.co.id",
      price: 285000,
      stock: 10,
      // UserId: checkToken(adminToken).id
    }
    request(app)
    .put(`/products/${ProductId}`)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(401)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('Please provide a token!')
      done()
    })
  })


  it('Failed update a product with negative value on stock', function(done) {
    const payload = {
      name: "H8 jackets",
      image_url:"www.google.co.id",
      price: 185000,
      stock: -15,
      // UserId: checkToken(adminToken).id
    }
    request(app)
    .put(`/products/${ProductId}`)
    .set('access_token', adminToken)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual(
        expect.arrayContaining(['Stock must contains positive value!'])
      )
      done()
    })
  })


  it('Failed update a product with negative value on price', function(done) {
    const payload = {
      name: "H8 jackets",
      image_url:"www.google.co.id",
      price: -185000,
      stock: 15,
      // UserId: checkToken(adminToken).id
    }
    request(app)
    .put(`/products/${ProductId}`)
    .set('access_token', adminToken)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual(
        expect.arrayContaining(['Price must contains positive value!'])
      )
      done()
    })
  })


  it('Failed update a product with wrong values on price and stock', function(done) {
    const payload = {
      name: "H8 jackets",
      image_url:"www.google.co.id",
      price: "XXX",
      stock: "YYY",
      // UserId: checkToken(adminToken).id
    }
    request(app)
    .put(`/products/${ProductId}`)
    .set('access_token', adminToken)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual(
        expect.arrayContaining(['Price must contains integer value!', 'Stock must contains integer value!'])
      )
      done()
    })
  })
})

// // ==================== DELETE ==================== //
describe('Delete a product', function(){

  // ***** TEST ***** //
  it('Success delete a product', function(done) {
    request(app)
    .delete(`/products/${ProductId}`)
    .set('access_token', adminToken)
    .set('Content-Type', 'application/json')
    .end(function(err, res) {
      if (err) done (err);
      expect(res.body).toHaveProperty('message')
      expect(res.statusCode).toEqual(201)
      expect(res.body.message).toEqual('Product deleted successfully!')
      done()
    })
  })


  it('Failed delete a product without access token', function(done) {
    request(app)
    .delete(`/products/${ProductId}`)
    .set('Content-Type', 'application/json')
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(401)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('Please provide a token!')
      done()
    })
  })


  it('Failed delete a product without admin\'s access token', function(done) {
    request(app)
    .delete(`/products/${ProductId}`)
    .set('access_token', customerToken)
    .set('Content-Type', 'application/json')
    .end(function(err, res) {
      if (err) done (err);
      expect(res.statusCode).toEqual(403)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('Need administrator authorization!')
      done()
    })
  })
})