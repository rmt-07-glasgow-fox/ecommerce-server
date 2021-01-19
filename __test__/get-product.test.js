const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { clearProduct } = require('./helpers/clearDb');


describe('GET /product', () => {
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

    it('GET /products/:id (existing entry) should response with status code 200', done => {
        request(app)
        .get('/products/226')
        .set('access_token', access_token)
        .end((err, res) => {
            if (err) {
                done(err)
            }
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('url');
            expect(res.body).toHaveProperty('price');
            expect(res.body).toHaveProperty('stock');
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('CategoryId');
            expect(res.body).toHaveProperty('Category');
            expect(res.body.Category).toHaveProperty('name');
            expect(typeof res.body.Category).toEqual('object');
            expect(res.body).toEqual({
                id: expect.any(Number),
                name: expect.any(String),
                url: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
                CategoryId: expect.any(Number),
                status: expect.any(String),
                Category: {
                    name: expect.any(String)
                }
            });
            done();
        });
    });

    it('GET /products/:id (non existing entry) should response with status code 404', done => {
        request(app)
        .get('/products/1')
        .set('access_token', access_token)
        .end((err, res) => {
            if (err) {
                done(err)
            }
            expect(res.statusCode).toEqual(404);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toEqual({
                message: `Not Found`
            });
            done();
        });
    });
});