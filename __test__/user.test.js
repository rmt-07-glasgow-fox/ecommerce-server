const request = require('supertest')
const app = require('../app')

describe('POST /user/login', () => {

    it('Status Code 200 : ', (done) => {
        // setup
        const body = {
            email: 'admin@gmail.com',
            password: 'admin'
        }

        // execute
        request(app)
            .post('/user/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                // assert
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('role')
                expect(res.body).toHaveProperty('email')

                expect(res.body.role).toEqual('admin')
                expect(res.body.email).toEqual(body.email)

                done()
            })
    })

    it('Status Code 400 | message : email / password is required', (done) => {
        // setup
        const body = {
            email: '',
            password: ''
        }

        // execute
        request(app)
            .post('/user/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.body.message).toEqual("email / password is required")
                done()
            })
    })

    it('Status Code 404 | message : email is not registered', (done) => {
        // setup
        const body = {
            email: 'admin01@gmail.com',
            password: 'admin'
        }

        // execute
        request(app)
            .post('/user/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.body.message).toEqual("email is not registered")
                done()
            })
    })

    it('Status Code 400 | message : password is not matched', (done) => {
        // setup
        const body = {
            email: 'admin@gmail.com',
            password: '123456'
        }

        // execute
        request(app)
            .post('/user/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.body.message).toEqual("password is not matched")
                done()
            })
    })
})