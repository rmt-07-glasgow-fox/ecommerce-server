const request = require('supertest')
const app = require('../app')
const { clearDB, clearDBUser } = require('../helpers/clearDB')
const {  User,  Product } =  require('../models')
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

const product = {
    name: "MOTOR LUCU",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxv5LHnWDg0y4iVLkDmb2OXeSzQtas_YM2eQ&usqp=CAU",
    price: 10000000000,
    stock: 1
}

let token
let token2
let id

beforeAll((done) => {
    User.create(admin)
    .then(data => {
        return User.create(customer);
    })
    .then(data => {
        return User.findOne({ where: { email: admin.email } })
    })
    .then(user => {
        const payload = {
            email: user.email,
            role: user.role
        };
        token = generateToken(payload);
        return User.findOne({ where: { email: customer.email }})
    })
    .then(user => {
        const payload = {
            email: user.email,
            role: user.role
        };
        token2 = generateToken(payload);
        return Product.create(product)
    })
    .then( data => {
        id = data.id
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

describe('POST/products/:id', function () {
    //TEST CASE 1
    it('should send response with 200 status code',function (done) {
        //setup
        const body = {
            name: 'caca',
            image_url: 'coca cola',
            price: 20000,
            stock:1
        }

        // execute
        request(app)
            .put(`/products/${id}`)
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(typeof res.body.message).toEqual('string')

                done()
            })
    })

    //TEST CASE 2
    it('should send response with 200 status code',function (done) {
        //setup
        const body = {
            name: 'caca',
            image_url: 'coca cola',
            price: 20000,
            stock:1
        }

        // execute
        request(app)
            .put(`/products/${id}`)
            .set('access_token', token2)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                //assert
                expect(res.statusCode).toEqual(403)
                expect(typeof body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(typeof res.body.message).toEqual('string')

                done()
            })
    })

    //TEST CASE 2
    it('should send response with 200 status code',function (done) {
        //setup
        const body = {
            name: 'ciki',
            image_url: '',
            price: 20000,
            stock:1
        }

        // execute
        request(app)
            .put(`/products/${id}`)
            .set('access_token', token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(typeof res.body.message).toEqual('string')

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
            .put(`/products/${id}`)
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

    //TEST CASE 4
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
            .put(`/products/${id}`)
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
            .put(`/products/${id}`)
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
            .put(`/products/${id}`)
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
            .put(`/products/${id}`)
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
            .put(`/products/${id}`)
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
            .put(`/products/${id}`)
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
            .put(`/products/${id}`)
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
