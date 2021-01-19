const request = require('supertest');
const models = require('../models');
const app = require('../app');
// const { clearProduct } = require('./helpers/clearDb');


describe('GET /products', () => {
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

    it(`DELETE /products/:id (existing entry) should response with status code 200 and message 'Success, product deleted'`, done => {

        request(app)
        .delete('/products/276')
        .set('access_token', access_token)
        .end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toEqual({
                message: 'Success, product deleted'
            });
            done();
        });
    });

    it(`DELETE /products/:id (non existing entry) should response with status code 404 and message 'Not Found'`, done => {

        request(app)
        .delete('/products/1')
        .set('access_token', access_token)
        .end((err, res) => {
            if (err) {
                done(err);
            }

            expect(res.statusCode).toEqual(404);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toEqual({
                message: 'Not Found'
            });
            done();
        });
    });

});