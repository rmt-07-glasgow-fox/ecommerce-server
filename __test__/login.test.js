const request = require("supertest")
const app = require("../app")
const models = require('../models')

// afterAll((done) => {
//     models.sequelize.close()
//     done()
// })

describe('POST /users', function () {
    it('should send response with status code 200', function (done) {
        const body = {
            email: "admin@mail.com",
            password: "1234"
        };

        request(app)
            .post('/users')
            .send(body)
            .end(function (err, res) {
                if (err) done(err)

                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('access_token');

                done()
            });
    });

    it('should send response with status code 404', function (done) {
        const body = {
            email: "",
            password: ""
        };
        
        request(app)
            .post('/users')
            .send(body)
            .end(function (err, res) {
                if (err) done(err)

                expect(res.statusCode).toEqual(404);
                expect(res.body.email).not.toBe(body.email)
                expect(res.body.message).toEqual('data not found');
                done()
            })
    })
});

