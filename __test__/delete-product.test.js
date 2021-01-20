const request = require('supertest')
const app = require('../app.js')
const clearProduct = require('./helpers/clear-products.js')
const getToken = require('./helpers/get-token.js')
const seedDummy = require('./helpers/seed-dummy.js')
const userDummy = require('./helpers/user-dummy.js')
const clearDummyUser = require('./helpers/clear-dummy-user.js')
const { generateToken } = require('../helpers/jwt.js')
const models = require('../models')

let token = ''
let dummyToken = ''
let idProduct = -1

describe('DELETE /products/:id', () => {
    beforeAll( (done) => {
        getToken()
        .then( data => {
            const payload = {
                id: data.id,
                email: data.email,
                role: data.role
            }
            token = generateToken(payload)
            return userDummy()
        })
        .then( data => {
            const payload = {
                id: data.id,
                email: data.email,
                role: data.role
            }
            dummyToken = generateToken(payload)
            done()
        } )
        .catch()
    } )
    beforeEach( (done) => {
        seedDummy()
        .then( data => {
            idProduct = data.id
            done()
        })
        .catch()
    } )
    afterAll( (done) => {
        clearProduct()
        .then( () => {
            return clearDummyUser()
        } )
        .then( () => {
            models.sequelize.close()
            done()
        } )
        .catch()
    } )
    it('success delete, should response 200', (done) => {
        //execute
        request(app) 
            .delete(`/products/${idProduct}`)
            .set('access_token', token)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Product has been deleted')
                
                done()
            } )
    })
    it('without access_token, should response 401', (done) => {
        //execute
        request(app) 
            .delete(`/products/${idProduct}`)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Please login first')
                
                done()
            } )
    })
    it('unathorize user, should response 401', (done) => {
        //execute
        request(app) 
            .delete(`/products/${idProduct}`)
            .set('access_token', dummyToken)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Unauthorized access')
                
                done()
            } )
    })
})