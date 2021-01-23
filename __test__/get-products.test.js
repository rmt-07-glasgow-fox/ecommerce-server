const request = require('supertest');
const app = require('../app');
const createProduct = require('./helpers/createProduct')
const clearProducts = require('./helpers/clearProducts');
const models = require('../models')

describe('GET /products', () => {
    beforeAll((done) => {
        createProduct()
            .then(product => {
                get_product_id = product.id;
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
        request(app)
            .get('/products')
            .set({access_token})
            .end((err, res) => {
                if (err) done(err);

                expect(res.statusCode).toEqual(200);
                expect(Array.isArray(res.body)).toEqual(true);
                expect(typeof res.body[0]).toEqual('object')

                done()
            })
    })

    it('should send response with 401 status code (forbidden access)', (done) => {
        request(app)
            .get('/products')
            .end((err, res) => {
                if (err) done(err);

                expect(res.statusCode).toEqual(401);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(expect.stringContaining('Forbidden access'))

                done()
            })
    })
})