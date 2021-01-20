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

describe('UPDATE /products/:id', () => {
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
            return seedDummy()
        } )
        .then( data => {
            idProduct = data.id
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
    it('success update, should response 200', (done) => {
        const body = {
            name: "The Second's Coming Gluttony Book 1",
            image_url: "https://cdn.novelupdates.com/images/2019/01/The-Second-Coming-of-Avarice.jpg",
            price: 33333,
            stock: 77
        }
        //execute
        request(app) 
            .put(`/products/${idProduct}`)
            .set('access_token', token)
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Update success')
                
                done()
            } )
    })
    it('without access_token, should response 401', (done) => {
        const body = {
            name: "The Second's Coming Gluttony Book 1",
            image_url: "https://cdn.novelupdates.com/images/2019/01/The-Second-Coming-of-Avarice.jpg",
            price: 33333,
            stock: 77,
            UserId: 1
        }
        //execute
        request(app) 
            .put(`/products/${idProduct}`)
            .send(body)
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
        const body = {
            name: "The Second's Coming Gluttony Book 1",
            image_url: "https://cdn.novelupdates.com/images/2019/01/The-Second-Coming-of-Avarice.jpg",
            price: 33333,
            stock: 77,
            UserId: 1
        }
        //execute
        request(app) 
            .put(`/products/${idProduct}`)
            .set('access_token', dummyToken)
            .send(body)
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
    it('input minus stock, should response 400', (done) => {
        const body = {
            name: "The Second's Coming Gluttony Book 1",
            image_url: "https://cdn.novelupdates.com/images/2019/01/The-Second-Coming-of-Avarice.jpg",
            price: 33333,
            stock: -77,
            UserId: 1
        }
        //execute
        request(app) 
            .put(`/products/${idProduct}`)
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
    it('input minus price, should response 400', (done) => {
        const body = {
            name: "The Second's Coming Gluttony Book 1",
            image_url: "https://cdn.novelupdates.com/images/2019/01/The-Second-Coming-of-Avarice.jpg",
            price: -33333,
            stock: 77,
            UserId: 1
        }
        //execute
        request(app) 
            .put(`/products/${idProduct}`)
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
        const body = {
            name: "The Second's Coming Gluttony Book 1",
            image_url: "https://cdn.novelupdates.com/images/2019/01/The-Second-Coming-of-Avarice.jpg",
            price: 33333,
            stock: "asdasd",
            UserId: 1
        }
        //execute
        request(app) 
            .put(`/products/${idProduct}`)
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
                    expect.arrayContaining([{"message": "Invalid type of stock value"}])
                )
                
                done()
            } )
    })
})