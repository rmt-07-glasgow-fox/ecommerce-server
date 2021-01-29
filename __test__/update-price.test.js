const request = require('supertest');
const app = require('../app');
const clearProducts = require('./helpers/clearProducts');
const createProduct = require('./helpers/createProduct');
const models = require('../models')

describe('PATCH /products/price/:id', () => {
    let price_product_id = null;
    let access_token = null
    let access_token_customer = null
    
    beforeAll((done) => {
        createProduct()
            .then(product => {
                price_product_id = product.id;
                done()
            })
            .catch(err => {
                console.log(err);
            })
    })

    beforeAll((done) => {
        request(app)
            .post('/login')
            .send({
                email: 'admin@mail.com',
                password: '123456',
            })
            .end((err, res) => {
                access_token = res.body.access_token
                done()
            })
    })

    beforeAll((done) => {
        request(app)
            .post('/login')
            .send({
                email: 'zalisha@mail.com',
                password: '123456',
            })
            .end((err, res) => {
                access_token_customer = res.body.access_token
                done()
            })
    })

    afterAll((done) => {
        clearProducts()
            .then(() => {
                models.sequelize.close()
                done()
            })
            .catch(err => {
                console.log(err);
            })
    })

    it('should send response with 200 status code', (done) => {
        const body = {
            price: 500
        }

        request(app)
            .patch('/products/price/' + price_product_id)
            .set({access_token})
            .send(body)
            .end((err, res) => {
                if (err) done(err);

                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object');
                expect(typeof res.body.id).toEqual('number');
                expect(typeof res.body.price).toEqual('number');

                expect(res.body.price).toEqual(body.price);
                expect(res.body).toHaveProperty('price');
                expect(res.body.price).toBeGreaterThanOrEqual(500);

                done()
            })
    })

    it('should send response with 400 status code (validation error)', (done) => {
        const body = {
            price: 0,
        }

        request(app)
            .patch('/products/price/' + price_product_id)
            .set({access_token})
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(
                    expect.arrayContaining([
                        'Product price must be greater or equal than 500'
                    ])
                )

                done()
            })
    })

    it('should send response with 401 status code (forbidden access)', (done) => {
        const body = {
            price: 1000,
        }

        request(app)
            .patch('/products/price/' + price_product_id)
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(401);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(
                    expect.stringContaining('Forbidden access')
                )

                done()
            })
    })

    it('should send response with 403 status code (not authorize)', (done) => {
        const body = {
            price: 1000,
        }

        request(app)
            .patch('/products/price/' + price_product_id)
            .set({access_token: access_token_customer})
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(403);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(
                    expect.stringContaining('Not authorize')
                )

                done()
            })
    })


    it('should send response with 404 status code (product not found)', (done) => {
        const body = {
            price: 500
        }

        request(app)
            .patch('/products/price/0')
            .set({ access_token })
            .send(body)
            .end((err, res) => {
                if (err) done(err);

                expect(res.statusCode).toEqual(404);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(expect.stringContaining('Product not found'))

                done()
            })
    })
})