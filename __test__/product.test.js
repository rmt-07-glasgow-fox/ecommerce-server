const request = require('supertest')
const app = require('../app')

// sequelize, models
const { sequelize, User, Product } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/token')

// user not found
let oldToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTEwMjAxMjR9.8kvexQZje-WHxHlWl4GkHyelPIyxFWkcWAEptKxSIL8"
let access_token = ''

// login as admin and generate token
beforeAll(async (done) => {
    try {
        let user = await User.findOne({ where: { email: 'admin@gmail.com' } })
        let convertToken = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        access_token = generateToken(convertToken)

        done()
    } catch (err) {
        console.log(err)
        done(err)
    }
})

afterAll(async (done) => {
    try {
        await queryInterface.bulkDelete('Products', null, {})
        done()
    } catch (err) {
        console.log(err)
        done(err)
    }
})

describe('POST /products', () => {

    it('Status Code 400 | name, image_url, price, stock, BrandId is not send in body', (done) => {
        console.log('>>> access_token', access_token)
        // setup
        let body = {
            // name: 'compass gazelle low black',
            // image_url: '/products/compass-gazelle-low-black.jpg',
            // price: 200000,
            // stock: 100,
            // BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(400)
                
                let error = {
                    "message": [
                        "name is null",
                        "image_url is null",
                        "price should be integer",
                        "stock should be integer",
                        "BrandId should be integer"
                    ]
                }

                expect(res.body).toEqual(error)
                done()
            })
    })

    it('Status Code 400 | image_url, price, stock, BrandId is not send in body', (done) => {
        console.log('>>> access_token', access_token)
        // setup
        let body = {
            name: 'compass gazelle low black',
            // image_url: '/products/compass-gazelle-low-black.jpg',
            // price: 200000,
            // stock: 100,
            // BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(400)

                let error = {
                    "message": [
                        "image_url is null",
                        "price should be integer",
                        "stock should be integer",
                        "BrandId should be integer"
                    ]
                }

                expect(res.body).toEqual(error)
                done()
            })
    })

    it('Status Code 400 | price, stock, BrandId is not send in body', (done) => {
        console.log('>>> access_token', access_token)
        // setup
        let body = {
            name: 'compass gazelle low black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            // price: 200000,
            // stock: 100,
            // BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(400)

                let error = {
                    "message": [
                        "price should be integer",
                        "stock should be integer",
                        "BrandId should be integer"
                    ]
                }

                expect(res.body).toEqual(error)
                done()
            })
    })

    it('Status Code 400 | stock, BrandId is not send in body', (done) => {
        console.log('>>> access_token', access_token)
        // setup
        let body = {
            name: 'compass gazelle low black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            price: 200000,
            // stock: 100,
            // BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(400)

                let error = {
                    "message": [
                        "stock should be integer",
                        "BrandId should be integer"
                    ]
                }

                expect(res.body).toEqual(error)
                done()
            })
    })

    it('Status Code 400 | BrandId is not send in body', (done) => {
        console.log('>>> access_token', access_token)
        // setup
        let body = {
            name: 'compass gazelle low black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            price: 200000,
            stock: 100,
            // BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(400)

                let error = {
                    "message": [
                        "BrandId should be integer"
                    ]
                }

                expect(res.body).toEqual(error)
                done()
            })
    })

    it('Status Code 400 | minimum stock is 0, minimum price 100000', (done) => {
        console.log('>>> access_token', access_token)
        // setup
        let body = {
            name: 'compass gazelle low black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            price: 20_000,
            stock: -5,
            BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(400)

                let error = {
                    "message": [
                        "minimum price is 100000",
                        "minimum stock is 0"
                    ]
                }

                expect(res.body).toEqual(error)
                done()
            })
    })

    it('Status Code 400 | minimum stock is 0', (done) => {
        console.log('>>> access_token', access_token)
        // setup
        let body = {
            name: 'compass gazelle low black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            price: 200_000,
            stock: -5,
            BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(400)

                let error = {
                    "message": [
                        "minimum stock is 0"
                    ]
                }

                expect(res.body).toEqual(error)
                done()
            })
    })

    it('Status Code 400 | minimum price 100000', (done) => {
        console.log('>>> access_token', access_token)
        // setup
        let body = {
            name: 'compass gazelle low black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            price: 20_000,
            stock: 0,
            BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(400)

                let error = {
                    "message": [
                        "minimum price is 100000"
                    ]
                }

                expect(res.body).toEqual(error)
                done()
            })
    })

    it('Status Code 401 | message : access_token is required', (done) => {
        // setup
        let body = {
            name: 'compass gazelle low black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            price: 200000,
            stock: 100,
            BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', '')
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(401)
                expect(res.body.message).toEqual("access_token is required")
                done()
            })
    })

    it('Status Code 401 | message : jwt malformed', (done) => {
        // setup
        let body = {
            name: 'compass gazelle low black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            price: 200000,
            stock: 100,
            BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', 'wrongtoken')
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(401)
                expect(res.body.message).toEqual("jwt malformed")
                done()
            })
    })

    it('Status Code 404 | message : User not found', (done) => {
        // setup
        let body = {
            name: 'compass gazelle low black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            price: 200000,
            stock: 100,
            BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', oldToken)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.statusCode).toEqual(404)
                expect(res.body.message).toEqual("User not found")
                done()
            })
    })

})