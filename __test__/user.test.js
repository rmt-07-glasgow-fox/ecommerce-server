const request = require('supertest')
const app = require('../app')

describe('POST /login', () => {
    it('should send response with 200 status code', (done) => {
        // Setup
        let body = {
            email: 'admin@gmail.com',
            password: '123456',
            role: 'admin'
        }
        // Execute
        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)
                // Assert
                expect(res.statusCode).toEqual(200)
                expect(res.body).toHaveProperty('access_token')
                expect(typeof res.body.access_token).toEqual('string')

                done()
            })
    })

    it('should send response "Invalid Email/Password"', (done) => {
        //Setup 
        let body = {
            email: '',
            password: '',
            role: 'admin'
        }
        // Execute
        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                // Assert 
                expect(res.statusCode).toEqual(400)
                expect(res.body).toHaveProperty('message', 'Invalid Email/Password')

                done()
            })
    })

    it('should send response "Invalid Email/Password"', (done) => {
        //Setup 
        let body = {
            email: 'admin@gmail.com',
            password: 'password salah',
            role: 'admin'
        }
        // Execute
        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                // Assert 
                expect(res.statusCode).toEqual(400)
                expect(res.body).toHaveProperty('message', 'Invalid Email/Password')

                done()
            })
    })
})