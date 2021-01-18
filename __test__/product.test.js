const request = require('supertest');
const app = require('../app');

const clearProduct = require('./helpers/clear-product');
const models = require('../models')

let token;

beforeAll((done) => {
    const body = {
        email: 'm.trinandanoviardy@gmail.com',
        password: 'qwerty'
    }

    request(app)
        .post('/login')
        .send(body)
        .end((err, res) => {
            token = res.body.access_token;
            done();
        })
});

describe('POST /products', () => {
    afterAll(async(done) => {
        try {
            await clearProduct();
            await models.sequelize.close();
            done();

        } catch (error) {
            console.log(error);
        }
    })

    it('should send response with 201 status code', (done) => {
        //Setup
        const body = {
            name: 'Charger Xiomi',
            image_url: 'image.jpg',
            price: 200000,
            stock: 10
        }

        // EXECUTE
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end((err, res) => {
                if (err) done(err);

                // ASSERT
                expect(res.statusCode).toEqual(201);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('id');
                expect(typeof res.body.id).toEqual('number');
                expect(res.body).toHaveProperty('name');
                expect(res.body.name).toEqual(body.name);
                expect(res.body).toHaveProperty('image_url');
                expect(res.body.image_url).toEqual(body.image_url);
                expect(res.body).toHaveProperty('price');
                expect(res.body.price).toEqual(body.price);
                expect(res.body).toHaveProperty('stock');
                expect(res.body.stock).toEqual(body.stock);

                done();
            });
    });

    it('should send response 400 status code', (done) => {
        // SETUP
        const body = {
            name: '',
            image_url: '',
            price: '',
            stock: '',
        }

        // EXECUTE
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end((err, res) => {
                if (err) done(err);

                // ASSERT
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(Array.isArray(res.body.errors)).toEqual(true);
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['field name is required']),
                    expect.arrayContaining(['field image url is required']),
                    expect.arrayContaining(['field price is required']),
                    expect.arrayContaining(['field stock is required']),
                );

                done();
            });
    });
});