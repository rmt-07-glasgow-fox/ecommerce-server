const request = require('supertest')
const app = require('../app')

describe('POST /loginAdmin', () => {
    it('should send response with 200 status code', (done) => {
        // Setup
        let userObj = {
            email: 'admin@mail.com',
            password: '1234',
            role: 'admin'
        }
        // Execute
        request(app)
            .post('/loginAdmin')
            .send(userObj)
            .end((err, res) => {
                if (err) done(err)
                // Assert
                expect(res.statusCode).toEqual(200)
                expect(res.body).toHaveProperty('access_token')
                expect(typeof res.body.access_token).toEqual('string')

                done()
            })
    })

    it('should send response with 401 "Unauthorized"', (done) => {
        let userObj = {
            email: 'user@mail.com',
            password: '1234',
            role: 'customer'
        }
        request(app)
            .post('/loginAdmin')
            .send(userObj)
            .end((err, res) => {
                if(err) done(err)

                expect(res.statusCode).toEqual(401)
                expect(res.body).toHaveProperty('message', 'Unauthorized')
                done()
            })
    })

    it('should send response with 400 "Invalid Email/Password"', (done) => {
        //Setup 
        let userObj = {
            email: 'admin@mail.com',
            password: 'password salah',
            role: 'admin'
        }
        // Execute
        request(app)
            .post('/loginAdmin')
            .send(userObj)
            .end((err, res) => {
                if(err) done(err)
                // Assert 
                expect(res.statusCode).toEqual(400)
                expect(res.body).toHaveProperty('message', 'Invalid Email/Password')

                done()
            })
    })
})