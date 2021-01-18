const request = require('supertest')
const clearDb = require('./helper')
const models = require('../models')

const app = require('../app')


describe('GET /products', function () {

    it('should send respond with 200 status code', function (done) {
        //EXECUTE
        request(app)
            .post('/products')
            .end(function (err ,res) {
                // Error supertest, bukan code mu
                if (err) done(err)   ;
                
                //ASERT
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('id');
                expect(typeof res.body.id).toEqual('number');
                expect(res.body).toHaveProperty('name');
                expect(res.body.name).toEqual(body.name);
                expect(res.body).toHaveProperty('description');
                expect(res.body.description).toEqual(body.description);
                expect(res.body).toHaveProperty('image_url');
                expect(res.body.image_url).toEqual(body.image_url);
                expect(res.body).toHaveProperty('condition');
                expect(res.body.condition).toEqual(body.condition);
                expect(res.body).toHaveProperty('price');
                expect(res.body.price).toEqual(body.price);
                expect(res.body).toHaveProperty('stock');
                expect(res.body.stock).toEqual(body.stock);
                done()
            })
    });
})