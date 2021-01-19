const request = require('supertest')
const app = require('../app')
// const { User } = require('../models')

describe('POST /login', function() {
    it('should send response with 200 status code ', (done) => {
        
        // setup
        const body = {
            email: 'admin@mail.com',
            password: '123456'
        }
        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                // err super test
                if (err) done(err)
                
                // asert
                expect(typeof res.body).toEqual('object')
                expect(res.statusCode).toEqual(200)
                expect(res.body).toHaveProperty('access_token')
                done()
            })
    })
    it('should send response with 400 status code (wrong password) ', (done) => {
        // setup
        const body1 = {
            email: 'admin@mail.com', 
            password: '123456s'
        }
        // excute
        request(app)
        .post('/login')
        .send(body1)
        .end((err, res) => {
            // err super test
            if (err) done(err)

            // asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body.msg).toEqual('email or password is undefined')
            done()
        })
    })
    it('should send response with 400 status code (blank input)', (done) => {
        // setup
        const body = {
            email: '', 
            password: ''
        }
        // excute
        request(app)
        .post('/login')
        .send(body)
        .end((err, res) => {
            // err super test
            if (err) done(err)

            // asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            done()
        })
    })
})