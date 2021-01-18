const request = require("supertest")
const app = require("../app")
const clearProduct = require("../helpers/clear-product-test.js")
const models = require('../models')

describe('POST /products', function () {
    let token
    beforeAll((done) => {
        const body = {
            email: "admin@mail.com",
            password: "12345"
        };

        request(app)
            .post('/users')
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                token = res.body.access_token
                done()
            });

    })

    afterAll((done) => {
        clearProduct()
            .then(() => {
                models.sequelize.close()
                done()
            })
            .catch(console.log)
    })

    it('should send response with status code 201', function (done) {
        const body = {
            name: "kaos tie dye",
            image_url:
                "https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/9/15/a8972d49-c880-43ec-950c-fe2d803643d5.jpg",
            price: 100000,
            stock: 50
        };

        //execute
        request(app)
            .post('/products')
            .send(body)
            .end(function (err, res) {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(201);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('name');
                expect(res.body.name).toEqual(body.name);
                expect(res.body).toHaveProperty('image_url');
                expect(res.body).toHaveProperty('price');
                expect(res.body).toHaveProperty('stock');

                done()
            });
    });

    it('should send response with status code 400', function (done) {
        const body = {
            name: "",
            image_url:
                "https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/9/15/a8972d49-c880-43ec-950c-fe2d803643d5.jpg",
            price: -1,
            stock: -1
        }
        request(app)
            .post('/products')
            .send(body)
            .end(function (err, res) {
                if (err) done(err)

                expect(res.statusCode).toEqual(400);
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Name is required', "stock must be more than 0", "Price must be more than 0"])
                );
                done()
            })
    })
});