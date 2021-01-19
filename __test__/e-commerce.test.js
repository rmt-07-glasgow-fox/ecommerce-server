const request = require("supertest")

const app = require('../app')
const clearProducts = require('./helpers/clear-products')
const models = require('../models')

const { User, Product } = require('../models')
const { generateToken } = require("../helpers/jwt")

let access_token
const productTest = {
    name: 'Hanayo Koizumi Poster',
    image_url: 'https://static.zerochan.net/Koizumi.Hanayo.full.2349510.jpg',
    price: 50000,
    stock:  999,
}
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

describe('POST/products', function() {
    afterAll(function(done) {
        clearProducts()
        .then(() => {
            models.sequelize.close()
            done()
        }).catch(console.log)
    })


    it('should send response with 201 status code', function (done) {
        //Setup
        const body = {
            name: 'Hanayo Koizumi Poster',
            image_url: 'https://static.zerochan.net/Koizumi.Hanayo.full.2349510.jpg',
            price: 50000,
            stock:  999,
        }
        //Execute
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(201);
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('name')
                expect(typeof res.body.name).toEqual('string')
                expect(res.body).toHaveProperty('image_url')
                expect(typeof res.body.image_url).toEqual('string')
                expect(res.body).toHaveProperty('price')
                expect(typeof res.body.price).toEqual('number')
                expect(res.body).toHaveProperty('stock')
                expect(typeof res.body.stock).toEqual('number')

                done()
            })
    })

    it('should send response 401 status code when not login', function(done) {
        //Setup
        const body = {
            name: 'Hanayo Koizumi Poster',
            image_url: 'https://static.zerochan.net/Koizumi.Hanayo.full.2349510.jpg',
            price: 50000,
            stock:  999,
        }
        //Execute
        request(app)
            .post('/products')
            .send(body)
            .end(function(err, res) {
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message))

                done()
            })
    })

    it('should send response 400 status code when price and stock in minus', function(done) {
        //Setup
        const body = {
            name: 'Karin Asaka Nesoberi',
            image_url: 'https://cdn.kyou.id/items/67633-love-live-school-idol-festival-all-stars-nesoberi-plush-asaka-karin-m.jpg',
            price: '-40000',
            stock:  '-234',
        }
        //Execute
        request(app)
            .post('/products')
            .send(body)
            .end(function(err, res) {
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message))

                done()
            })
    })

    it('should send response 400 status code when null or undefined', function(done) {
        //Setup
        const body = {
            name: '',
            image_url: '',
            price: '',
            stock:  '',
        }
        //Execute
        request(app)
            .post('/products')
            .send(body)
            .end(function(err, res) {
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message))

                done()
            })
    })
})