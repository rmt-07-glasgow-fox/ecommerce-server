const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jsonwebtoken')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token_admin
let access_token_user

beforeAll((done)=> {
    User.findOne({
        where: { email: 'admin@mail.com'}
    })
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token_admin = generateToken(payload)
            return User.findOne({
                where: { email: 'user@mail.com'}
            })
        })
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token_user = generateToken(payload)

            done()
        })
        .catch(err => {
            done(err)
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products')
        .then(() => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

describe('POST /products', () => {
    it('should send response with 201 status code', (done) => {
        // Setup
        let productObj = {
            name: 'Kasur',
            image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            price: 20500000,
            stock: 5
        }
        // Execute
        request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(productObj)
            .end((err, res) => {
                if (err) done(err)
                
                // Assert
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('name')
                expect(res.body.name).toEqual(productObj.name)
                expect(res.body).toHaveProperty('image_url')
                expect(res.body.image_url).toEqual(productObj.image_url)
                expect(res.body).toHaveProperty('price')
                expect(res.body.price).toEqual(productObj.price)
                expect(res.body).toHaveProperty('stock')
                expect(res.body.stock).toEqual(productObj.stock)

                done()
            })
    })

    it('should send response 401 "You need to login first"', (done) => {
        // Setup
        let productObj = {
            name: 'Kasur',
            image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            price: 20500000,
            stock: 5
        }
        // Execute
        request(app)
            .post('/products')
            .send(productObj)
            .end((err, res) => {
                if (err) done(err)
                
                // Assert
                expect(res.statusCode).toEqual(401)
                expect(res.body).toHaveProperty('message', 'You need to login first')

                done()
            })
    })

    it('should send response 401 "Unauthorized"', (done) => {
        // Setup
        let productObj = {
            name: 'Kasur',
            image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            price: 20500000,
            stock: 5
        }
        // Execute
        request(app)
            .post('/products')
            .set('access_token', access_token_user)
            .send(productObj)
            .end((err, res) => {
                if (err) done(err)
                
                // Assert
                expect(res.statusCode).toEqual(401)
                expect(res.body).toHaveProperty('message', 'Unauthorized')

                done()
            })
    })

    it('should send response 400 "Validation Errors"', (done) => {
        // Setup
        let productObj = {
            name: '',
            image_url: '',
            price: -1,
            stock: -1
        }
        // Execute
        request(app)
            .post('/products')
            .send(productObj)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                if(err) done(err)
                
                // Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['Name is required', 'Image Url is required', 'Minimum price is 0', 'Minimum stock is 0'])
                )
                
                done()
            })
    })

    it('should send response 400 "Validation Errors"', (done) => {
        // Setup
        let productObj = {
            name: 'Kasur',
            image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            price: 'asd',
            stock: 'asd'
        }
        // Execute
        request(app)
            .post('/products')
            .send(productObj)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                if(err) done(err)
                
                // Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['Price must be a number', 'Stock must be a number'])
                )
                
                done()
            })
    })
})
