const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jsonwebtoken')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token_admin
let access_token_user
let id

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
            return queryInterface.bulkInsert('Products', [{
                name: 'Kasur',
                image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                price: 20500000,
                stock: 10,
                createdAt: new Date(), 
                updatedAt: new Date()
            }], {})
        })
        .then(data => {
            return Product.findAll({ limit: 1})
        })
        .then(data => {
            // console.log(data)
            id = data[0].dataValues.id
            // console.log('ini id', id)
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

describe('PUT /products/:id', () => {
    it('should send response with 200 status code', (done) => {
        let updateProduct = {
            name: 'Kasur nyaman',
            image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            price: 5000,
            stock: 3
        }

        request(app)
            .put(`/products/${id}`)
            .send(updateProduct)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
            
                done()
            })
    })

    it('should send response 401 "Unauthorized"', (done) => {
        let updateProduct = {
            name: 'Kasur nyaman',
            image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            price: 5000,
            stock: 3
        }

        request(app)
            .put(`/products/${id}`)
            .send(updateProduct)
            .set('access_token', access_token_user)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(401)
                expect(res.body).toHaveProperty('message', 'Unauthorized')
            
                done()
            })
    })

    it('should send response 401 "You need to login first"', (done) => {
        let updateProduct = {
            name: 'Kasur nyaman',
            image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            price: 5000,
            stock: 3
        }

        request(app)
            .put(`/products/${id}`)
            .send(updateProduct)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(401)
                expect(res.body).toHaveProperty('message', 'You need to login first')
            
                done()
            })
    })

    it('should send response 400 "Validation Errors"', (done) => {
        let updateProduct = {
            name: '',
            image_url: '',
            price: -1,
            stock: -1
        }

        request(app)
            .put(`/products/${id}`)
            .send(updateProduct)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                if (err) done(err)

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
        let updateProduct = {
            name: 'Kasur nyaman',
            image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            price: 'asd',
            stock: 'asd'
        }

        request(app)
            .put(`/products/${id}`)
            .send(updateProduct)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                if (err) done(err)

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