const request = require('supertest')
const app = require('../app.js')
const clearProduct = require('./helpers/clear-products.js')
const seedDummy = require('./helpers/seed-dummy.js')
const models = require('../models')

describe('GET /products', () => {
    beforeAll( (done) => {
        seedDummy()
        .then( () => {
            done()
        } )
        .catch()
    } )
    afterAll( (done) => {
        clearProduct()
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
})