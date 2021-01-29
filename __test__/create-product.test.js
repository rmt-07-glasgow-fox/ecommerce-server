const request = require('supertest');
const app = require('../app');
const clearProducts = require('./helpers/clearProducts');
const models = require('../models')

describe('POST /products', () => {
    let access_token = null;
    let access_token_customer = null;
    
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

    it('should send response with 201 status code', (done) => {
        // Setup
        const body = {
            name: 'Kaktus',
            image_url: 'https://images.unsplash.com',
            price: 500,
            stock: 100
        }

        console.log(access_token);
        console.log(access_token_customer);

        request(app)
            .post('/products')
            .set({access_token})
            .send(body)
            .end((err, res) => {
                if (err) done(err);

                expect(res.statusCode).toEqual(201);
                expect(typeof res.body).toEqual('object');
                expect(typeof res.body.id).toEqual('number');
                expect(typeof res.body.price).toEqual('number');
                expect(typeof res.body.stock).toEqual('number');

                expect(res.body.name).toEqual(body.name);
                expect(res.body.image_url).toEqual(body.image_url);
                expect(res.body.price).toEqual(body.price);
                expect(res.body.stock).toEqual(body.stock);

                expect(res.body).toHaveProperty('id');
                expect(res.body).toHaveProperty('name');
                expect(res.body).toHaveProperty('image_url');
                expect(res.body).toHaveProperty('price');
                expect(res.body).toHaveProperty('stock');

                expect(res.body.price).toBeGreaterThanOrEqual(500);
                expect(res.body.stock).toBeGreaterThanOrEqual(0);

                done()
            })
    })

    it('should send response with 400 status code (validation error)', (done) => {
        const body = {
            name: '',
            image_url: '',
            price: 490,
            stock: -1,
        }

        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(
                    expect.arrayContaining([
                        'Product name is required',
                        'Product price must be greater or equal than 500',
                        'Product stock must be greater or equal than zero'
                    ])
                )

                done()
            })
    })

    it('should send response with 401 status code (forbidden access)', (done) => {
        const body = {
            name: 'Buku tulis',
            image_url: 'google.com',
            price: 500,
            stock: 1,
        }

        request(app)
            .post('/products')
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
            name: 'Buku tulis',
            image_url: 'google.com',
            price: 500,
            stock: 1,
        }

        request(app)
            .post('/products')
            .set( "access_token", access_token_customer )
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
})