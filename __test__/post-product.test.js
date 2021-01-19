const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { clearProduct } = require('./helpers/clearDb');


describe('POST /products', () => {
    let access_token = '';
    beforeAll(done => {
        request(app)
        .post('/login')
        .send({
            email: 'admin@mail.com',
            password: '123456'
        })
        .end((err,res) => {
            access_token = res.body.access_token;
            done();
        });
    });

    afterAll(done => {
        // clearProduct()
        // .then( _=> {
        //     models.sequelize.close();
        //     done();
        // })
        // .catch(err, console.log(err))
        models.sequelize.close();
        done();
    });

    it('POST /products should response with status code 201 and status in stock', done => {
        const body = {
            name: Math.random().toString().substring(3),
            url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/91b84bcc11df9d4386464f66f195f19870db12ca_xxl-1.jpg',
            price: 180000,
            stock: 10,
            CategoryId: 71
        };

        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res.statusCode).toEqual(201);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('url');
            expect(res.body).toHaveProperty('price');
            expect(res.body).toHaveProperty('stock');
            expect(res.body).toHaveProperty('CategoryId');
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body).toHaveProperty('updatedAt');
            expect(res.body).toEqual({
                id: expect.any(Number),
                name: expect.any(String),
                url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/91b84bcc11df9d4386464f66f195f19870db12ca_xxl-1.jpg',
                price: 180000,
                stock: 10,
                CategoryId: 71,
                status: 'in stock',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
            done();
        });
    });

    it('POST /products should response with status code 201 and status out of stock', done => {
        const body = {
            name: Math.random().toString().substring(3),
            url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/91b84bcc11df9d4386464f66f195f19870db12ca_xxl-1.jpg',
            price: 180000,
            stock: 0,
            CategoryId: 71
        };

        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res.statusCode).toEqual(201);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('url');
            expect(res.body).toHaveProperty('price');
            expect(res.body).toHaveProperty('stock');
            expect(res.body).toHaveProperty('CategoryId');
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body).toHaveProperty('updatedAt');
            expect(res.body).toEqual({
                id: expect.any(Number),
                name: expect.any(String),
                url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/91b84bcc11df9d4386464f66f195f19870db12ca_xxl-1.jpg',
                price: 180000,
                stock: 0,
                CategoryId: 71,
                status: 'out of stock',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
            done();
        });
    });

    it(`POST /products should response with status code 400 with message 'Please input product name between 3 to 20 characters'`, done => {
        const body = {
            name: 'No',
            url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/91b84bcc11df9d4386464f66f195f19870db12ca_xxl-1.jpg',
            price: 180000,
            stock: 10,
            CategoryId: 71
        };

        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(Array.isArray(res.body)).toBe(true);
            res.body.map(err => {
                expect(err).toHaveProperty('message');
                expect(err).toEqual({
                    message: `Please input product name between 3 to 20 characters`
                })
            })
            done();
        })
    });

    it(`POST /products should response with status code 400 with message 'Please input product url in url format'`, done => {
        const body = {
            name: 'Polka T-Shirt',
            url: '',
            price: 180000,
            stock: 10,
            CategoryId: 71
        };

        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(Array.isArray(res.body)).toBe(true);
            res.body.map(err => {
                expect(err).toHaveProperty('message');
                expect(err).toEqual({
                    message: 'Please input product url in url format'
                })
            })
            done();
        });
    });

    it(`POST /products should response with status code 400 with message 'Please input product price'`, done => {
        const body = {
            name: 'Polka T-Shirt',
            url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/91b84bcc11df9d4386464f66f195f19870db12ca_xxl-1.jpg',
            price: '',
            stock: 10,
            CategoryId: 71
        };

        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(Array.isArray(res.body)).toBe(true);
            res.body.map(err => {
                expect(err).toHaveProperty('message');
                expect(err).toEqual({
                    message: 'Please input product price'
                })
            })
            done();
        })
    });

    it(`POST /products should response with status code 400 with message 'Please input positive integer (price)'`, done => {
        const body = {
            name: 'Polka T-Shirt',
            url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/91b84bcc11df9d4386464f66f195f19870db12ca_xxl-1.jpg',
            price: -1,
            stock: 10,
            CategoryId: 71
        };

        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(Array.isArray(res.body)).toBe(true);
            res.body.map(err => {
                expect(err).toHaveProperty('message');
                expect(err).toEqual({
                    message: 'Please input positive integer (price)'
                })
            })
            done();
        })
    });

    it(`POST /products should response with status code 400 with message 'Please input product stock'`, done => {
        const body = {
            name: 'Polka T-Shirt',
            url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/91b84bcc11df9d4386464f66f195f19870db12ca_xxl-1.jpg',
            price: 180000,
            stock: '',
            CategoryId: 71
        };

        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(Array.isArray(res.body)).toBe(true);
            res.body.map(err => {
                expect(err).toHaveProperty('message');
                expect(err).toEqual({
                    message: 'Please input product stock'
                })
            })
            done();
        })
    });

    it(`POST /products should response with status code 400 with message 'Please only input positive integer (stock)'`, done => {
        const body = {
            name: 'Polka T-Shirt',
            url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/91b84bcc11df9d4386464f66f195f19870db12ca_xxl-1.jpg',
            price: 180000,
            stock: -1,
            CategoryId: 71
        };

        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(Array.isArray(res.body)).toBe(true);
            res.body.map(err => {
                expect(err).toHaveProperty('message');
                expect(err).toEqual({
                    message: 'Please only input positive integer (stock)'
                })
            })
            done();
        })
    });



});