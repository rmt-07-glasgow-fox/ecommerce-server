const request = require("supertest")

const app = require('../app')
const clearProducts = require('./helpers/clear-products')
const models = require('../models')

const { User, Product } = require('../models')
const { generateToken } = require("../helpers/jwt")

const bukanadminbiasa = {
    id:100,
    email: 'bukanadminbiasa@mail.com',
    role: 'customer'
}
let access_token
let access_token2 = generateToken(bukanadminbiasa)

let objProductId

beforeAll(done => {
    User.findOne({
        where: {
            email: 'admin@mail.com'
        }
    })
    .then(data => {
        access_token = generateToken ({
            id: data.id,
            email: data.email,
            role: data.role
        })
        const productTest = {
            name: 'Hanayo Koizumi Poster',
            image_url: 'https://static.zerochan.net/Koizumi.Hanayo.full.2349510.jpg',
            price: 50000,
            stock:  999,
            UserId: data.id
        }
        return Product.create(productTest)
    })
    .then(product => {
        objProductId = product.id
        done()
    })
    .catch(err => {
        done()
    })
})

describe('PUT/products/:id', function() {
    afterAll(function(done) {
        clearProducts()
        .then(() => {
            models.sequelize.close()
            done()
        }).catch(console.log())
    })

    it('should send response with 200 status code', function (done) {
        //Setup
        const body = {
            name: 'Hanayo Koizumi Poster',
            image_url: 'https://static.zerochan.net/Koizumi.Hanayo.full.2349510.jpg',
            price: 35000,
            stock:  999,
        }
        //Execute
        request(app)
            .put(`/products/${objProductId}`)
            .set('access_token', access_token)
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('msg')
                expect(Array.isArray(res.body.msg))

                done()
            })
    })

    it('should send response with 401 status code when no access code', function (done) {
        //Setup
        const body = {
            name: 'Hanayo Koizumi Poster',
            image_url: 'https://static.zerochan.net/Koizumi.Hanayo.full.2349510.jpg',
            price: 35000,
            stock:  999,
        }
        //Execute
        request(app)
            .put(`/products/${objProductId}`)
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message))

                done()
            })
    })

    it('should send response with 401 status code when login not as admin', function (done) {
        //Setup
        const body = {
            name: 'Hanayo Koizumi Poster',
            image_url: '',
            price: 35000,
            stock:  999,

        }
        //Execute
        request(app)
            .put(`/products/${objProductId}`)
            .set('access_token', access_token2)
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message))

                done()
            })
    })

    it('should send response with 400 status code when price or stock in minus', function (done) {
        //Setup
        const body = {
            name: 'Hanayo Koizumi Poster',
            image_url: 'https://static.zerochan.net/Koizumi.Hanayo.full.2349510.jpg',
            price: -35000,
            stock:  -999,

        }
        //Execute
        request(app)
            .put(`/products/${objProductId}`)
            .set('access_token', access_token)
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors))

                done()
            })
    })

    it('should send response with 400 status code when image_url in null', function (done) {
        //Setup
        const body = {
            name: 'Hanayo Koizumi Poster',
            image_url: '',
            price: 35000,
            stock:  999,

        }
        //Execute
        request(app)
            .put(`/products/${objProductId}`)
            .set('access_token', access_token)
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors))

                done()
            })
    })

    it('should send response with 400 status code when name and image_url in null', function (done) {
        //Setup
        const body = {
            name: '',
            image_url: '',
            price: 35000,
            stock:  999,

        }
        //Execute
        request(app)
            .put(`/products/${objProductId}`)
            .set('access_token', access_token)
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors))

                done()
            })
    })

    it('should send response with 400 status code when price and stock in null', function (done) {
        //Setup
        const body = {
            name: 'Hanayo Koizumi Poster',
            image_url: 'https://static.zerochan.net/Koizumi.Hanayo.full.2349510.jpg',
            price: '',
            stock:  '',

        }
        //Execute
        request(app)
            .put(`/products/${objProductId}`)
            .set('access_token', access_token)
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors))

                done()
            })
    })

    it('should send response with 400 status code when in null or undefined', function (done) {
        //Setup
        const body = {
            name: '',
            image_url: '',
            price: '',
            stock:  '',

        }
        //Execute
        request(app)
            .put(`/products/${objProductId}`)
            .set('access_token', access_token)
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors))

                done()
            })
    })
})