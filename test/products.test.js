const app = require('../app')
const request = require('supertest')
const { clearProducts, createProduct } = require('./helpers/helpers_products')

describe('POST/products', function() {
    afterAll(function(done) {
        clearProducts()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('should send response with 201 status code', function(done) {
        //setup
        const body = {
            name: 'sepatu adidas',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/715DtOHh94L._UX500_.jpg',
            price: 200000,
            stock: 15
        }
        //execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

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
            })

    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            name: '',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/715DtOHh94L._UX500_.jpg',
            price: 200000,
            stock: 15
        }
        //execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['name is required'])
                )

                done()
            })

    })
})

describe('GET/products', function() {
    beforeAll(function(done) {
        createProduct()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    afterAll(function(done) {
        clearProducts()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('should send response with 200 status code', function(done) {
        //setup
        //execute
        request(app)
            .get('/products')
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name: 'tes',
                            image_url: 'tes2',
                            price: 1000,
                            stock: 14
                        })
                    ])
                )

                done()
            })
    })
})