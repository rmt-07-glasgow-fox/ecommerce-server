const request = require('supertest');
const app = require('../app');
const clearProducts = require('./helpers/clearProducts');
const createProduct = require('./helpers/createProduct');
const models = require('../models');

describe('GET /products/:id', () => {
    let get_product_id = null;
    let access_token = null;

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
            .get('/products/' + get_product_id)
            .set({access_token})
            .end((err, res) => {
                if (err) done(err);
                
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(typeof res.body.id).toEqual('number');
                expect(typeof res.body.price).toEqual('number');
                expect(typeof res.body.stock).toEqual('number');

                expect(res.body).toHaveProperty('id');
                expect(res.body).toHaveProperty('name');
                expect(res.body).toHaveProperty('image_url');
                expect(res.body).toHaveProperty('price');
                expect(res.body).toHaveProperty('stock');

                done()
            })
    })

    it('should send response with 401 status code (forbidden access)', (done) => {
        request(app)
            .get('/products/' + get_product_id)
            .end((err, res) => {
                if (err) done(err);

                expect(res.statusCode).toEqual(401);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(expect.stringContaining('Forbidden access'))

                done()
            })
    })

    it('should send response with 404 status code (product not found)', (done) => {
        request(app)
            .get('/products/0')
            .set({ access_token })
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