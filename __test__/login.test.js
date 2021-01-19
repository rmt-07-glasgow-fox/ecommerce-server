const request = require("supertest")
const app = require("../app")
const models = require("../models")

describe('POST /login', () => {
    afterAll((done) => {
        models.sequelize.close()
        done()
    })

    it('should send response with 200 status code', (done) => {
        const body = {
            email: 'admin@mail.com',
            password: '1234'
        };

        request(app)
        .post('/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('access_token');

            done()
        })

    })

    it('should send response with 400 status code when input is null', (done) => {
        const body = {
            email: '',
            password: ''
        };

        request(app)
        .post('/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Email/Password is required')
 
            done()
        })

    })

    it('should send response with 400 status code with invalid input', (done) => {
        const body = {
            email: 'admiiin@mail.com',
            password: '123456'
        };

        request(app)
        .post('/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(404);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Email/Password Invalid')
 
            done()
        })

    })

    it('should send response with 400 status code with invalid input', (done) => {
        const body = {
            email: 'admin@mail.com',
            password: '1234567'
        };

        request(app)
        .post('/login')
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(404);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Email/Password Invalid')
 
            done()
        })

    })
})