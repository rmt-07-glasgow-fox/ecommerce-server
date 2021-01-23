const request = require('supertest')
const app = require('../app')
const { clearDB, clearDBUser } = require('../helpers/clearDB')
const {  User } =  require('../models')
const { generateToken } = require('../helpers/jwt')

const admin = {
    email: 'test5@mail.com',
    password: '123456',
    role: 'admin'
}

const customer = {
    email: 'testlagi5@mail.com',
    password: '123456',
    role: ''
}

let token
let token2

beforeAll((done) => {
    User.create(admin)
    .then(data => {
        return User.create(customer);
    })
    .then(data => {
        return User.findOne({ where: { email: admin.email } })
    })
    .then(data => {
        const payload = {
            email: data.email,
            role: data.role
        };
        token = generateToken(payload);
        return User.findOne({ where: { email: customer.email }})
    })
    .then(data => {
        const payload = {
            email: data.email,
            role: data.role
        };
        token2 = generateToken(payload);
        done()
    })        
    .catch(err => {
        console.log(err);
    });
});

afterAll(function (done) {
    clearDB()
    .then( (data) => {
        return clearDBUser()
    })
    .then( (data) => {
        done()
    })
    .catch( err => {
        console.log(err);
    })
})

describe('POST/products', function () {
    //TEST CASE 1
    it('should send response with 201 status code',function (done) {
        //setup
        const body = {
            name: 'donat',
            image_url: 'donat',
            price: 20000,
            stock:1
        }

        // execute
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                //assert
                expect(res.statusCode).toEqual(201)
                expect(typeof body).toEqual('object')
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('image_url')
                expect(res.body).toHaveProperty('price')
                expect(res.body).toHaveProperty('stock')
                expect(typeof res.body.name).toEqual('string')
                expect(typeof res.body.image_url).toEqual('string')
                expect(typeof res.body.price).toEqual('number')
                expect(typeof res.body.stock).toEqual('number')

                done()
            })
    })

    //TEST CASE 2
    it('should send response with 201 status code',function (done) {
        //setup
        const body = {
            name: 'donat',
            image_url: '',
            price: 20000,
            stock:1
        }

        // execute
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                //assert
                expect(res.statusCode).toEqual(201)
                expect(typeof body).toEqual('object')
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('image_url')
                expect(res.body).toHaveProperty('price')
                expect(res.body).toHaveProperty('stock')
                expect(typeof res.body.name).toEqual('string')
                expect(typeof res.body.image_url).toEqual('string')
                expect(typeof res.body.price).toEqual('number')
                expect(typeof res.body.stock).toEqual('number')

                done()
            })
    })

    //TEST CASE 3
    it('should send response with 400 status code', function (done) {
        //setup
        const body = {
            name: '',
            image_url: 'https://google.com/sepatu',
            price: 2,
            stock: 1
        }

        // execute
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                // assert
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

    it('should send response with 400 status code', function (done) {
        //setup
        const body = {
            name: 'donat',
            image_url: 'https://google.com/sepatu',
            price: '',
            stock: 1
        }

        // execute
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['price is require']) 
                )

                done()
            })
    })

    it('should send response with 400 status code', function (done) {
        //setup
        const body = {
            name: "donat",
            image_url: 'https://google.com/sepatu',
            price: 'asdad',
            stock: 1
        }

        // execute
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['price should be a number']) 
                )

                done()
            })
    })

    it('should send response with 400 status code', function (done) {
        //setup
        const body = {
            name: "donat",
            image_url: 'https://google.com/sepatu',
            price: 0,
            stock: 1
        }

        // execute
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['price should be greater than 0']) 
                )

                done()
            })
    })

    it('should send response with 400 status code', function (done) {
        //setup
        const body = {
            name: "donat",
            image_url: 'https://google.com/sepatu',
            price: -1,
            stock: 1
        }

        // execute
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['price should be greater than 0']) 
                )

                done()
            })
    })

    it('should send response with 400 status code', function (done) {
        //setup
        const body = {
            name: "donat",
            image_url: 'https://google.com/sepatu',
            price: 2,
            stock: -1
        }

        // execute
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['stock should be greater than 0']) 
                )

                done()
            })
    })

    it('should send response with 400 status code', function (done) {
        //setup
        const body = {
            name: "donat",
            image_url: 'https://google.com/sepatu',
            price: 2,
            stock: 0
        }

        // execute
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['stock should be greater than 0']) 
                )

                done()
            })
    })

    it('should send response with 400 status code', function (done) {
        //setup
        const body = {
            name: "donat",
            image_url: 'https://google.com/sepatu',
            price: 2,
            stock: 'sdasd'
        }

        // execute
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['stock should be a number']) 
                )

                done()
            })
    })
})
