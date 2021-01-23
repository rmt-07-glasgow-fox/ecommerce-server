const request = require('supertest');
const app = require('../app');
const clearProducts = require('./helpers/clearProducts');
const createProduct = require('./helpers/createProduct');
const models = require('../models')

describe('PATCH /products/stock/:id', () => {
    let stock_product_id = null;
    let access_token = null;
    let access_token_customer = null;

    beforeAll((done) => {
        createProduct()
            .then(product => {
                stock_product_id = product.id;
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
                password: '123456'
            })
            .end((err, res) => {
                access_token = res.body.access_token;
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
            stock: 0
        }

        request(app)
            .patch('/products/stock/' + stock_product_id)
            .set({access_token})
            .send(body)
            .end((err, res) => {
                if (err) done(err);
                expect(typeof res.body).toEqual('object');
                expect(typeof res.body.id).toEqual('number');
                expect(typeof res.body.stock).toEqual('number');

                expect(res.body.stock).toEqual(body.stock);
                expect(res.body).toHaveProperty('stock');
                expect(res.body.stock).toBeGreaterThanOrEqual(0);

                done()
            })
    })

    it('should send response with 400 status code (validation error)', (done) => {
        const body = {
            stock: -1,
        }

        request(app)
            .patch('/products/stock/' + stock_product_id)
            .set({access_token})
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(
                    expect.arrayContaining([
                        'Product stock must be greater or equal than zero'
                    ])
                )

                done()
            })
    })

    it('should send response with 401 status code (forbidden access)', (done) => {
        const body = {
            stock: 5,
        }

        request(app)
            .patch('/products/stock/' + stock_product_id)
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
            stock: 5,
        }

        request(app)
            .patch('/products/stock/' + stock_product_id)
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
            stock: 0
        }

        request(app)
            .patch('/products/stock/0')
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