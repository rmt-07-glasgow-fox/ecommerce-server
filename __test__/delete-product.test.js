const request = require('supertest');
const app = require('../app');
const clearProducts = require('./helpers/clearProducts');
const createProduct = require('./helpers/createProduct');
const models = require('../models')

describe('DELETE /products', () => {
    let access_token = null;
    let access_token_customer = null;
    let delete_product_id = null;

    beforeAll((done) => {
        createProduct()
            .then(product => {
                delete_product_id = product.id;
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
                email: 'zalisha@mail.com',
                password: '123456',
            })
            .end((err, res) => {
                access_token_customer = res.body.access_token
                done()
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
            .delete('/products/' + delete_product_id)
            .set({access_token})
            .end((err, res) => {
                if (err) done(err);

                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual(expect.stringContaining('Product has been deleted'))

                done()
            })
    })

    it('should send response with 401 status code (forbidden access)', (done) => {
        request(app)
            .delete('/products/' + delete_product_id)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(401);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(expect.stringContaining('Forbidden access'))

                done()
            })
    })


    it('should send response with 403 status code (not authorize)', (done) => {
        request(app)
            .delete('/products/' + delete_product_id)
            .set('access_token', access_token_customer)
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
        request(app)
            .delete('/products/' + delete_product_id)
            .set({ access_token })
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(404);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(expect.stringContaining('Product not found'))

                done()
            })
    })
})