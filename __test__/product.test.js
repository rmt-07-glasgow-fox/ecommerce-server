const request = require('supertest')
const app = require('../app')
// const clearProducts = require('./helpers/clear-products')
const {hashPassword} = require('../helpers/bcrypt')
const {sequelize} = require('../models')
// const {Product} = require('../models')
const {generateToken} = require('../helpers/jwt')
// const { hash } = require('bcryptjs')

let productId
adminToken = generateToken({id: 1,email:'admin@mail.com',role:'admin'})

beforeAll((done) => {
  sequelize.queryInterface.bulkInsert("Users", [
    {
      first_name: "John",
      last_name: "Doe",
      email: "admin@mail.com",
      password: hashPassword("1234"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      first_name: "Jane",
      last_name: "Doe",
      email: "customer@mail.com",
      password: hashPassword("1234"),
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {})
  .then(data => {
    return sequelize.queryInterface.bulkInsert('Products', [
      {
        name: 'Playstation 5',
        image_url: 'https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/gameconsoles/Sony_Playstation_5_ph/Sony_Playstation_5_ph_L_1.jpg',
        price: 9000000,
        stock: 12,
        category: 'gaming',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{})
  })
  .then(user => {
    access_token = adminToken
    done();
  })
  .catch((err) => {
    done(err);
  })
}); 

afterAll(done => {
  sequelize.queryInterface.bulkDelete('Products',null,{})
  .then(data => {
    return sequelize.queryInterface.bulkDelete('Users',null,{})
  })
  .then(data => {
    done()
    // sequelize.close()
  })
  .catch(err => {
    done(err)
  })
})

describe('POST admin/products', function() {
  it('should send response with 201 status code', function(done) {
    const body = {
      name: "test name",
      category: "test category",
      image_url: "www.url.com",
      price: 50000,
      stock: 100
    }
    request(app)
      .post('/admin/products')
      .set('access_token', adminToken)
      .send(body)
      .end(function(err,res) {
        if(err) done(err)
        productId = res.body.data.id
        console.log(productId,"==========");
        expect(res.status).toEqual(201);
        expect(typeof res.body).toEqual('object');
        expect(res.body.data).toHaveProperty('id');
        expect(typeof res.body.data.id).toEqual('number');
        expect(res.body.data).toHaveProperty('name');
        expect(res.body.data.name).toEqual(body.name);
        expect(res.body.data).toHaveProperty('category');
        expect(res.body.data.category).toEqual(body.category);

        done();
      })
  })
  it('should send response with 500 status code', function(done) {
    const body = {
      name: "",
      category: "",
      image_url: "",
      price: null,
      stock: null
    }
    request(app)
      .post('/admin/products')
      .set('access_token', adminToken)
      .send(body)
      .end(function(err,res) {
        if(err) done(err);
        expect(res.statusCode).toEqual(500)
        expect(typeof res.body).toEqual('object')
        done();
      })
  })
})

// =================== PUT ===================

describe('PUT /admin/products', function() {
  it('should send response with 200 status code', function(done) {
    const body = {
      name: "test name",
      image_url: "www.url.com",
      price: 50000,
      stock: 100,
      category: "test category"
    }
    request(app)
    .put(`/admin/products/${productId}`)
    .set('access_token', adminToken)
    .send(body)
    .end(function(err,res) {
      console.log(productId,"@@@@@@@@@@@@@@@@@@");
      console.log(res.statusCode,"+++++++++++++++++");
      if(err) done(err)
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual('object');
      expect(res.body.data).toHaveProperty('id');
      expect(typeof res.body.data.id).toEqual('number');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data.name).toEqual(body.name);
      expect(res.body.data).toHaveProperty('category');
      expect(res.body.data.category).toEqual(body.category);

      done();
    })
  })
})

//============= DELETE =====================

describe('DELETE admin/products', function() {
  it('should send response with 200 status code', function(done) {
    request(app)
    .delete(`/admin/products/${productId}`)
    .set('access_token', adminToken)
    .end(function(err,res) {
      console.log(productId,"@@@@@@@@@@@@@@@@@@");
      console.log(res.statusCode,"+++++++++++++++++");
      if(err) done(err)
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual('object');
      expect(res.body.data).toHaveProperty('id');
      expect(typeof res.body.data.id).toEqual('number');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data.name).toEqual(body.name);
      expect(res.body.data).toHaveProperty('category');
      expect(res.body.data.category).toEqual(body.category);

      done();
    })
  })
})