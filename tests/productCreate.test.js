const request = require('supertest')
const app = require('../app')
const { sequelize, user } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let access_token_admin 
let access_token_cust

beforeAll( (done) => {
    user.findOne({
        where: {
            email: 'admin@mail.com'
        }
    })
    .then( data => {
        const payload = {
            id: data.dataValues.id,
            email: data.dataValues.email,
            role: data.dataValues.role
        }
        access_token_admin = generateToken(payload)
        // console.log(access_token_admin); 
        return user.findOne({
            where: {
                email: 'cust@mail.com'
            }
        })
    })
    .then(data => {
        const payload = {
            id: data.id,
            email: data.email,
            role: data.role
        }
        access_token_cust = generateToken(payload)
        // console.log(access_token_cust);
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('products')
      .then(() => {
        done()
      })
      .catch(done)
  })

let productValid = { name: 'Jersey MU',image_url: 'MU.jpg', price: 100000, stock: 10}
let productFieldEmpty = { name: '',image_url: '', price: '', stock: 10}
let productStockMinus = { name: 'Jersey MU',image_url: 'MU.jpg', price: 100000, stock: -10}
let productPriceMinus = { name: 'Jersey MU',image_url: 'MU.jpg', price: -100000, stock: 10}
let productWrongTypeData = { name: 'Jersey MU',image_url: 'MU.jpg', price: 100000, stock: 'sepuluh'}


describe( 'POST /product success', ()=> {
    test('create success', (done) => {
        request(app)
        .post('/product/create')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(productValid)
        .then( response => {
            const {status, body} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', productValid.name)
            expect(body).toHaveProperty('image_url', productValid.image_url)
            expect(body).toHaveProperty('price', productValid.price)
            expect(body).toHaveProperty('stock', productValid.stock)
            done()
        })
        .catch( err => {
            done(err)
        })
    })
})

describe( 'POST /product failed', ()=> {
    test('create failed, access_token not exist', (done) => {
        request(app)
        .post('/product/create')
        .set('Accept', 'application/json')
        .send(productValid)
        .then( response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Please Login First')
            done()
        })
        .catch( err => {
            done(err)
        })
    })

    test('create failed, access_token isn\'t access token admin', (done) => {
        request(app)
        .post('/product/create')
        .set('Accept', 'application/json')
        .set('access_token', access_token_cust)
        .send(productValid)
        .then( response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Please Login First')
            done()
        })
        .catch( err => {
            done(err)
        })
    })

    test('create failed, field require is empty', (done) => {
        request(app)
        .post('/product/create')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(productFieldEmpty)
        .then( response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        .catch( err => {
            done(err)
        })
    })

    test('create failed, field stock is minus', (done) => {
        request(app)
        .post('/product/create')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(productStockMinus)
        .then( response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        .catch( err => {
            done(err)
        })
    })

    test('create failed, field price is minus', (done) => {
        request(app)
        .post('/product/create')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(productPriceMinus)
        .then( response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        .catch( err => {
            done(err)
        })
    })

    test('create failed, type data is wrong', (done) => {
        request(app)
        .post('/product/create')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(productWrongTypeData)
        .then( response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        .catch( err => {
            done(err)
        })
    })
})