const request = require('supertest')
const app = require('../app')
const clearProducts = require('./helpers/clearProducts')
const seedProducts = require('./helpers/seedProducts')
const models = require('../models/')
const { Product } = require('../models/')


let access_token = null

beforeAll((done) => {
    // user login di controller panggil di sini
    // access_token = login()
    seedProducts()
        .then(() => {
            done()
        })
        .catch(console.log)
})

afterAll((done) => {
    clearProducts()
        .then(() => {
            models.sequelize.close()
            done()
        })
        .catch(console.log)
})


describe('POST /products', () => {
    it('should send response with 201 status code', (done) => {
        // Execute
        request(app)
            .post('/products')
            .end((err, res) => {
                //err from supertest
                if (err) done(err)

                // Assert

                // check the data in the db
                Product.findOne({ name: 'nice headphones' })
                    .then(product => {
                        expect(res.statusCode).toEqual(201)
                        expect(typeof product).toEqual('object')

                        expect(product).toHaveProperty('id')
                        expect(typeof product.id).toEqual('number')

                        expect(product).toHaveProperty('name')
                        expect(typeof product.name).toEqual('string')

                        expect(product).toHaveProperty('image_url')
                        expect(typeof product.image_url).toEqual('string')

                        expect(product).toHaveProperty('price')
                        expect(typeof product.price).toEqual('number')

                        expect(product).toHaveProperty('stock')
                        expect(typeof product.stock).toEqual('number')

                        done()
                    })
                    .catch(console.log)

            })
    })

    it('should send response with 400 status code', (done) => {
        // Setup
        const body = {
            name: '',
            image_url: '',
            price: '',
            stock: ''
        }
        // Execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                //err from supertest
                if (err) done(err)

                // check the data in the db
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Name required', 'Image_url required', 'Price required', 'Stock required'])
                )

                done()
            })
    })

    it('should send response with 400 status code - natural number for price and stock', (done) => {
        const body = {
            name: 'nice headphones',
            image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
            price: -120000,
            stock: -5
        }

        // Execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                //err from supertest
                if (err) done(err)

                // Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Price must be greater than zero', 'Stock must be greater than zero'])
                )

                done()
            })
    })

    it('should send response with 400 status code - invalid data types for price and stock', (done) => {
        const body = {
            name: 'nice headphones',
            image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
            price: 'yeyeyeye',
            stock: 'testing'
        }

        // Execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                //err from supertest
                if (err) done(err)

                // Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Price must be a valid number', 'Stock must be a valid number'])
                )

                done()
            })
    })

    it.only('should send response with 400 status code - invalid data types for name', (done) => {
        const body = {
            name: 10000,
            image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
            price: 120000,
            stock: 5
        }

        // Execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                //err from supertest
                if (err) done(err)

                // Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Name must contain only alphanumeric characters'])
                )

                done()
            })
    })

    it('should send response with 400 status code - invalid data types for image_url', (done) => {
        const body = {
            name: 'nice headphones',
            image_url: 'wkwkwkwkwk',
            price: 120000,
            stock: 5
        }

        // Execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                //err from supertest
                if (err) done(err)

                // Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Image_url must contain a url'])
                )

                done()
            })
    })
})


