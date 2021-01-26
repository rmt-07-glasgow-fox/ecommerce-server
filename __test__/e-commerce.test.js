const { expect, afterAll } = require('@jest/globals')
const request = require('supertest')
const app = require('../app')
const {Product, User} = require('../models')
const cleanUp = require('./test-helper/cleanUp')
const generateToken = require('../helper/generateToken')

describe('POST /login', function(){

  it('should send response with 200 status code', function(done){
    //Setup
    const body = {
      email: 'admin@mail.com',
      password: '1234'
    }
    //Execute
    request(app)
      .post('/login')
      .send(body)
      .end(function(err, res){
        if(err) done(err)

        //Assert
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('email')
        expect(res.body.email).toEqual(body.email)
        expect(res.body).toHaveProperty('access_token')
        expect(res.body.access_token).toEqual(expect.any(String))

        done()
      })
  })

  it('shoud send response with statusCode 401', function(done){
    //Setup
    const body = {
       email: 'admin@mail.com',
       password: 'paswordSalah'
    }

    //Execute
    request(app)
      .post('/login')
      .send(body)
      .end(function(err, res){
        if(err) done(err)

        //Assert
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Email/password incorrect')

        done()
      })
  })
})

describe('POST /product', function(){
  let access_token
  beforeAll((done)=>{
    User.findOne({where:{email: 'admin@mail.com'}})
    .then(data=>{
      let payload = {id: data.id, email: data.email, username: data.username}
      access_token = generateToken(payload)
      done()
    })
  })

  afterAll((done)=>{
    cleanUp()
    .then(()=>{
      Product.sequelize.close()
      done()
    })
    .catch(console.log)
  })
  it('should send response with 201 status code', function(done){
    //Setup
    const body = {
      name: 'Ak-47',
      description: 'Senjata teroris',
      category: 'assault-rifle',
      price: 1000000,
      stock: 20,
      imageUrl: 'Aka47.jpg'
    }

    //Execute
    request(app)
      .post('/product')
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res){
        if(err) done(err)

        //Assert
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('description')
        expect(res.body).toHaveProperty('category')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('stock')
        expect(res.body).toHaveProperty('imageUrl')
        expect(typeof res.body.id).toEqual('number')
        expect(res.body.name).toEqual(body.name)
        expect(res.body.description).toEqual(body.description)
        expect(res.body.category).toEqual(body.category)
        expect(res.body.price).toEqual(body.price)
        expect(res.body.stock).toEqual(body.stock)
        expect(res.body.imageUrl).toEqual(body.imageUrl)

        done()
      })
  })

  it('shoud send response with statusCode 400 when all body empty', function(done){
    //Setup
    const body = {
      name: '',
      description: '',
      category: '',
      price: null,
      stock: null,
      imageUrl: ''
    }

    //Execute
    request(app)
      .post('/product')
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res){
        if(err) done(err)

        //Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errorMessage')
        expect(Array.isArray(res.body.errorMessage)).toEqual(true)
        expect(res.body.errorMessage).toEqual(
          expect.arrayContaining([
            'name cannot empty',
            'description cannot empty',
            'category cannot empty',
            'price min 1',
          ])
        )

        done()
      })
  })

  it('shoud send response with statusCode 400 when price == 0 and stock value invalid', function(done){
    //Setup
    const body = {
      name: 'Ak-47',
      description: 'Senjata teroris',
      category: 'assault-rifle',
      price: 0,
      stock: -1,
      imageUrl: 'Aka47.jpg'
    }

    //Execute
    request(app)
      .post('/product')
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res){
        if(err) done(err)

        //Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errorMessage')
        expect(Array.isArray(res.body.errorMessage)).toEqual(true)
        expect(res.body.errorMessage).toEqual(
          expect.arrayContaining([
            "price min 1",
            "invalid stock value"
          ])
        )

        done()
      })
  })

  it('shoud send response with statusCode 403 when jwt is not provided', function(done){
    //Setup
    const body = {
      name: 'Ak-47',
      description: 'Senjata teroris',
      category: 'assault-rifle',
      price: 1000000,
      stock: 20,
      imageUrl: 'Aka47.jpg'
    }

    //Execute
    request(app)
      .post('/product')
      .send(body)
      .end(function(err, res){
        if(err) done(err)

        //Assert
        expect(res.statusCode).toEqual(403)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Log in first')

        done()
      })
  })
})

describe('DELETE /product/:id', function(){
  let access_token
  let user
  let product

  beforeAll((done)=>{
    User.findOne({where:{email: 'admin@mail.com'}})
    .then(data=>{
      user = data
      let payload = {id: data.id, email: data.email, username: data.username}
      access_token = generateToken(payload)
      let createProduct = {
        name: 'Ak-47',
        description: 'Senjata teroris',
        category: 'assault-rifle',
        price: 1000000,
        stock: 20,
        imageUrl: 'Aka47.jpg'
      }
      return Product.create(createProduct)
    })
    .then(data=>{
      product = data
      done()
    })
    .catch(err=>{
      console.log(err)
      
    })
  })

  afterAll((done)=>{
    cleanUp()
    .then(()=>{
      Product.sequelize.close()
      done()
    })
    .catch(console.log)
  })

  it('should send response with 200 status code', function(done){
    //Execute
    request(app)
      .delete(`/product/${product.id}`)
      .set('access_token', access_token)
      .end(function(err, res){
        if(err) done(err)

        //Assert
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Product deleted')
      
        done()
      })
  })
  
})