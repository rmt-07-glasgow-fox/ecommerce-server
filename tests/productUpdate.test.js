const request = require('supertest')
const app = require('../app')
const { sequelize, user, product } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let access_token_admin 
let access_token_cust
let id_product

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
        let inputProduct = {
            name: "Jersey MU",
            image_url: "MU.jpg",
            price: 100000,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        return product.create(inputProduct)
    })
    .then( dataProduct => {
        id_product = dataProduct.id
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

let productValid = { name: 'Jersey MU',image_url: 'MU.jpg', price: 135000, stock: 5}
let productFieldEmpty = { name: '',image_url: '', price: '', stock: ''}
let productStockMinus = { name: 'Jersey MU',image_url: 'MU.jpg', price: 100000, stock: -10}
let productPriceMinus = { name: 'Jersey MU',image_url: 'MU.jpg', price: -100000, stock: 10}
let productWrongTypeData = { name: 'Jersey MU',image_url: 'MU.jpg', price: 100000, stock: 'sepuluh'}


describe( 'PUT /product/update/id success', ()=> {
    test('update success', (done) => {
        request(app)
        .put(`/product/update/${+id_product}`)
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(productValid)
        .then( response => {
            const {status, body} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'Product is updated')
            done()
        })
        .catch( err => {
            done(err)
        })
    })
})

describe( 'PUT /product/update/id failed', ()=> {
    test('update failed, access_token not exist', (done) => {
        request(app)
        .put(`/product/update/${+id_product}`)
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

    test('update failed, access_token isn\'t access token admin', (done) => {
        request(app)
        .put(`/product/update/${+id_product}`)
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

    test('update failed, field require is empty', (done) => {
        request(app)
        .put(`/product/update/${+id_product}`)
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

    test('update failed, field stock is minus', (done) => {
        request(app)
        .put(`/product/update/${+id_product}`)
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

    test('update failed, field price is minus', (done) => {
        request(app)
        .put(`/product/update/${+id_product}`)
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

    test('update failed, type data is wrong', (done) => {
        request(app)
        .put(`/product/update/${+id_product}`)
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

