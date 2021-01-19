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

describe('DELETE /products/:id', () => {
    it('should send response with 200 status code', (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                if (err) done(err)
                
                expect(res.statusCode).toEqual(200)
                expect(res.body).toHaveProperty('message', 'Product has been deleted')
                
                done()
            })
    })

    it('should send response 404 "Not Found"', (done) => {
        request(app)
            .delete(`/products/${id+1}`)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                if (err) done(err)
                
                expect(res.statusCode).toEqual(404)
                expect(res.body).toHaveProperty('message', 'Not Found')

                done()
            })
    })

    it('should send response 401 "Unauthorized"', (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', access_token_user)
            .end((err, res) => {
                if (err) done(err)
                
                expect(res.statusCode).toEqual(401)
                expect(res.body).toHaveProperty('message', 'Unauthorized')
                
                done()
            })
    })

    it('should send response 401 "You need to login first"', (done) => {
        request(app)
            .delete(`/products/${id}`)
            .end((err, res) => {
                if (err) done(err)
                
                expect(res.statusCode).toEqual(401)
                expect(res.body).toHaveProperty('message', 'You need to login first')
                
                done()
            })
    })
})