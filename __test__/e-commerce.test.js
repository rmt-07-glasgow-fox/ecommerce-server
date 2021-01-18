const request = require("supertest")

const app = require('../app')
const clearProducts = require('./helpers/clear-products')

const models = require('../models')

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

    it('should send response 400 status code', function(done) {
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
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true);
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Price cannot less then 0', 'Stock cannot less then 0'])
                )

                done()
            })
    })

    it('should send response 400 status code', function(done) {
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
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true);
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Name is required', 'Image Url is required', 'Price is required', 'Stock is required'])
                )

                done()
            })
    })
})