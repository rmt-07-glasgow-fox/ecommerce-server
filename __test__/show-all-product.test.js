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

describe('GET /products', () => {
    beforeAll( (done) => {
        getToken()
        .then( data => {
            const payload = {
                id: data.id,
                email: data.email,
                role: data.role
            }
            token = generateToken(payload)
            return seedDummy()
        } )
        .then( data => {
            done()
        } )
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
    it('success showAll, should response 200', (done) => {
        //execute
        request(app) 
            .get('/products')
            .set('access_token', token)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                done()
            } )
    })
    it('without access_token, should response 401', (done) => {
        //execute
        request(app) 
            .get('/products')
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                done()
            } )
    })
})