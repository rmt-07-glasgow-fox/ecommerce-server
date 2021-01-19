const app = require('../app')
const request = require('supertest')
const { clearUsers } = require('./helpers/helpers_users')

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
            role: 'admin'
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
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
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
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
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
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['role is required'])
                )

                done()
            })

    })
})