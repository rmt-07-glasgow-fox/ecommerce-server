const request = require('supertest');
const app = require('../app');
const models = require('../models')
// const createUser = require('./helpers/createUser')

describe('POST /login', () => {
    // beforeAll((done) => {
    //     createUser()
    //         .then(() => {
    //             done()
    //         })
    // })

    afterAll((done) => {
        models.sequelize.close()
        done()
    })

    it('should send response with 200 status code', (done) => {
        const body = {
            email: 'admin@mail.com',
            password: '123456'
        }

        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err);

                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('access_token');
                expect(typeof res.body.access_token).toEqual('string')

                done()
            })
    })

    it('should send response with 400 status code for invalid user', (done) => {
        const body = {
            email: 'abdulhaki@mail.com',
            password: '1234567',
        }

        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(404);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors).toEqual(
                    expect.stringContaining('Invalid email / password')
                )
                done()
            })
    })
})