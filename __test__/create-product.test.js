const request = require('supertest')
const app = require('../app.js')
const clearProduct = require('./helpers/clear-products.js')
const getToken = require('./helpers/get-token.js')
const { generateToken } = require('../helpers/jwt.js')
const models = require('../models')

let token = ''

describe('POST /products', () => {
    beforeAll( (done) => {
        getToken()
        .then( data => {
            const payload = {
                id: data.id,
                email: data.email,
                role: data.role
            }
            token = generateToken(payload)
            done()
        })
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
    it('full request, should response 201', (done) => {
        //setup
        const body = {
            name: "The Second's Coming Gluttony Book 1",
            image_url: "https://cdn.novelupdates.com/images/2019/01/The-Second-Coming-of-Avarice.jpg",
            price: 77777,
            stock: 100,
            UserId: 1
        }
        //execute
        request(app) 
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('name')
                expect(res.body.name).toEqual(body.name)
                expect(res.body).toHaveProperty('image_url')
                expect(res.body.image_url).toEqual(body.image_url)
                expect(res.body).toHaveProperty('price')
                expect(res.body.price).toEqual(body.price)
                expect(res.body).toHaveProperty('stock')
                expect(res.body.stock).toEqual(body.stock)
                
                done()
            } )
    })
    it('only name, should response 201', (done) => {
        //setup
        const body = {
            name: "The Second's Coming Gluttony Book 1",
            UserId: 1
        }
        //execute
        request(app) 
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('name')
                expect(res.body.name).toEqual(body.name)
                expect(res.body).toHaveProperty('image_url')
                expect(res.body).toHaveProperty('price')
                expect(res.body).toHaveProperty('stock')
                
                done()
            } )
    })
    it('empty name, should response 400', (done) => {
        //setup
        const body = {
            name: "",
            UserId: 1
        }
        //execute
        request(app) 
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toEqual(
                    expect.arrayContaining([{"message": "Name Product cant be Empty"}])
                )

                done()
            } )
    })
    it('minus stock, should response 400', (done) => {
        //setup
        const body = {
            name: "Jacket",
            stock: -7,
            UserId: 1
        }
        //execute
        request(app) 
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toEqual(
                    expect.arrayContaining([{"message": "Invalid stock value, minimum value is 0"}])
                )

                done()
            } )
    })
    it('minus price, should response 400', (done) => {
        //setup
        const body = {
            name: "Jacket",
            price: -7,
            UserId: 1
        }
        //execute
        request(app) 
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toEqual(
                    expect.arrayContaining([{"message": "Invalid price value, minimum value is 0"}])
                )

                done()
            } )
    })
    it('wrong type request, should response 400', (done) => {
        //setup
        const body = {
            name: "Jacket",
            price: "asdasd",
            UserId: 1
        }
        //execute
        request(app) 
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toEqual(
                    expect.arrayContaining([{"message": "Invalid type of price value"}])
                )

                done()
            } )
    })
    it('without access_token, should response 401', (done) => {
        const body = {
            name: "Jacket",
            UserId: 1
        }
        request(app)
            .post('/products')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body.message).toEqual("Please login first")
                expect(res.body.description).toEqual("jwt must be provided")

                done()
            } )
    })
    it('unformated access_token, should response 401', (done) => {
        const body = {
            name: "Jacket",
            UserId: 1
        }
        request(app)
            .post('/products')
            .set('access_token', 'asd7auf88921030ios')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body.message).toEqual("Please login first")
                expect(res.body.description).toEqual("jwt malformed")

                done()
            } )
    })
    it('wrong access_token, should response 401', (done) => {
        const body = {
            name: "Jacket",
            UserId: 1
        }
        request(app)
            .post('/products')
            .set('access_token', 'x' + token)
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body.message).toEqual("Please login first")
                expect(res.body.description).toEqual("invalid token")

                done()
            } )
    })
})