const app = require('../app')
const request = require('supertest')
const { clearProducts, createProduct, getToken } = require('./helpers/helpers_products')
const { clearUsers } = require('./helpers/helpers_users')

let dummyId = ''
let tokenAdmin = ''

describe('POST/products', function() {
    afterAll(function(done) {
        clearProducts()
        .then(data => {
            return clearUsers
        })
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
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['name is required'])
                )

                done()
            })

    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            name: 'tes sepatu',
            image_url: '',
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
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['image_url is required'])
                )

                done()
            })

    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            name: 'tes sepatu',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/715DtOHh94L._UX500_.jpg',
            price: '',
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
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['price is required'])
                )

                done()
            })

    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            name: 'tes sepatu',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/715DtOHh94L._UX500_.jpg',
            price: 200000,
            stock: ''
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
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['stock is required'])
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

describe('GET/products/:id', function() {
    beforeAll(function(done) {
        createProduct()
        .then(data => {
            dummyId = data.id
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
            .get(`/products/${dummyId}`)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: 'tes',
                        image_url: 'tes2',
                        price: 1000,
                        stock: 14
                    })
                )

                done()
            })
    })
    it('should send response with 404 status code', function(done) {
        //setup
        //execute
        request(app)
            .get(`/products/${dummyId + 2}`)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(404)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toEqual(                 
                    expect.objectContaining({
                        message: 'Data Not Found'
                    })
                )

                done()
            })
    })
})

describe('PUT/products/:id', function() {
    beforeAll(function(done) {
        createProduct()
        .then(data => {
            dummyId = data.id
            console.log(dummyId, 'ini dummy id')
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
        const body = {
            name: 'tes hasil edit',
            stock: 12
        }
        //execute
        request(app)
            .put(`/products/${dummyId}`)
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toEqual(                 
                    expect.objectContaining({
                        name: 'tes hasil edit',
                        image_url: 'tes2',
                        price: 1000,
                        stock: 12
                    })
                )

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
            .put(`/products/${dummyId}`)
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['name is required'])
                )

                done()
            })

    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            name: 'tes sepatu',
            image_url: '',
            price: 200000,
            stock: 15
        }
        //execute
        request(app)
            .put(`/products/${dummyId}`)
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['image_url is required'])
                )

                done()
            })

    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            name: 'tes sepatu',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/715DtOHh94L._UX500_.jpg',
            price: '',
            stock: 15
        }
        //execute
        request(app)
            .put(`/products/${dummyId}`)
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['price is required'])
                )

                done()
            })

    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            name: 'tes sepatu',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/715DtOHh94L._UX500_.jpg',
            price: 200000,
            stock: ''
        }
        //execute
        request(app)
            .put(`/products/${dummyId}`)
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['stock is required'])
                )

                done()
            })

    })
})

describe('DELETE/products/:id', function() {
    beforeAll(function(done) {
        createProduct()
        .then(data => {
            dummyId = data.id
            console.log(dummyId, 'ini dummy id')
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
            .delete(`/products/${dummyId}`)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toEqual(                 
                    expect.objectContaining({
                        message: 'Product Has Been Succesfully Deleted'
                    })
                )

                done()
            })
    })
    it('should send response with 404 status code', function(done) {
        //setup
        //execute
        request(app)
            .delete(`/products/${dummyId + 2}`)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(404)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toEqual(                 
                    expect.objectContaining({
                        message: 'Data Not Found'
                    })
                )

                done()
            })
    })
})