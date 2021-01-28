const app = require('../app')
const request = require('supertest')
const { clearUsers, registerUser } = require('./helpers/helpers_users')

describe('POST/register', function() {
    afterAll(function(done) {
        clearUsers()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('should send response with 201 status code', function(done) {
        //setup
        const body = {
            email: 'tes@mail.com',
            password: 'tes123',
            role: 'customer'
        }
        //execute
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('email')
                expect(res.body.email).toEqual(body.email)
                expect(res.body).toHaveProperty('role')
                expect(res.body.role).toEqual(body.role)

                done()
            })

    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            email: '',
            password: 'tes123',
            role: 'admin'
        }
        //execute
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['email is required'])
                )

                done()
            })

    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            email: 'tes@mail.com',
            password: '',
            role: 'admin'
        }
        //execute
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['password is required'])
                )

                done()
            })

    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            email: 'tes@mail.com',
            password: 'tes123',
            role: ''
        }
        //execute
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message)).toEqual(true)
                expect(res.body.message).toEqual(
                    expect.arrayContaining(['role is required'])
                )

                done()
            })

    })
})

describe('POST/login', function() {
    beforeAll(function(done) {
        registerUser()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    afterAll(function(done) {
        clearUsers()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('should send response with 200 status code', function(done) {
        //setup
        const body = {
            email: 'tes5@mail.com',
            password: '123123'
        }
        //execute
        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('access_token')
                expect(typeof res.body.access_token).toEqual('string')

                done()
            })

    })
    it('1 should send response with 401 status code', function(done) {
        //setup
        const body = {
            email: 'tes69@mail.com',
            password: '123123',
        }
        //execute
        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid Email / Password')

                done()
            })

    })
    it('2 should send response with 401 status code', function(done) {
        //setup
        const body = {
            email: 'tes5@mail.com',
            password: ''
        }
        //execute
        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid Email / Password')

                done()

            })

    })
})