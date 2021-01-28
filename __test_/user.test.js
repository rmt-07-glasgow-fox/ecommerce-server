const request = require('supertest')
const clearDb = require('./helper')
const models = require('../models')
const app = require('../app')

afterAll((done) => {
    clearDb()
    .then(data => {
        models.sequelize.close()
        done()
    })
    .catch(err => {
        console.log(err);
    })
})

describe('POST /register', function () {
    it('should send respond with 201 status code', function (done) {
        const body = {
            name: 'romi',
            email: 'romi@mail.com',
            password: '12345678',
            role: 'Admin'
        }
        request(app)
            .post('/register')
            .send(body)
            .end(function (err ,res) {
                if (err) done(err);
                expect(res.statusCode).toEqual(201);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('id');
                expect(typeof res.body.id).toEqual('number');
                expect(res.body).toHaveProperty('name');
                expect(res.body.name).toEqual(body.name);
                expect(res.body).toHaveProperty('email');
                expect(res.body.email).toEqual(body.email);
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        //SETUP
        const body = {
            name: '',
            email: '',
            password: '',
            role: ''
        };
        //execute
        request(app)
            .post('/register')
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                //asert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Name is required'])
                )

                done()
            })

    })
})

describe('POST /login', function () {

    afterAll((done) => {
        models.sequelize.close()
        done()
    })

    it('should send respond with 200 status code', function (done) {
        //SETUP
        const body = {
            email: 'romi@mail.com',
            password: '12345678'
        }
        //EXECUTE
        request(app)
            .post('/login')
            .send(body)
            .end(function (err ,res) {
                // Error supertest, bukan code mu
                if (err) done(err)   ;
                
                //ASERT
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('access_token');
                expect(typeof res.body.access_token).toEqual('string');
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        //SETUP
        const body = {
            email: '',
            password: ''
        };
        request(app)
            .post('/login')
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                //asert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                done()
            })

    })
})
