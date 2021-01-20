const request = require('supertest')
const app = require('../app.js')
const clearProduct = require('./helpers/clear-products.js')
const models = require('../models')


describe('POST /login', () => {
    afterAll( (done) => {
        clearProduct()
        .then( () => {
            models.sequelize.close()
            done()
        } )
        .catch()
    } )
    it('success login, should response 200', (done) => {
        //setup
        const body = {
            email: "admin@mail.com",
            password: "123456",
            role: "admin"
        }
        //execute
        request(app) 
            .post('/login')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('access_token')
                expect(typeof res.body.access_token).toEqual('string')
                
                done()
            } )
    })
    it('wrong password, should response 400', (done) => {
        //setup
        const body = {
            email: "admin@mail.com",
            password: "12345",
            role: "admin"
        }
        //execute
        request(app) 
            .post('/login')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid email/ password')
                
                done()
            } )
    })
    it('wrong email, should response 400', (done) => {
        //setup
        const body = {
            email: "admn@mail.com",
            password: "123456",
            role: "admin"
        }
        //execute
        request(app) 
            .post('/login')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid email/ password')
                
                done()
            } )
    })
    it('wrong role, should response 400', (done) => {
        //setup
        const body = {
            email: "admin@mail.com",
            password: "12345",
            role: "customer"
        }
        //execute
        request(app) 
            .post('/login')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid email/ password')
                
                done()
            } )
    })
    it('invalid role, should response 400', (done) => {
        //setup
        const body = {
            email: "admin@mail.com",
            password: "12345",
            role: "staff"
        }
        //execute
        request(app) 
            .post('/login')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid email/ password')
                
                done()
            } )
    })
    it('empty request, should response 400', (done) => {
        //setup
        const body = {
            email: "",
            password: "",
            role: ""
        }
        //execute
        request(app) 
            .post('/login')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Please input email & password first')
                
                done()
            } )
    })
})