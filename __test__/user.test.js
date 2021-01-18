const request = require('supertest')
const app = require('../app')

describe('POST /login', ()=> {
    it('should send response with 200 status code ', () => {
        // setup
        const body = {
            email: 'admin@mail.com',
            password: '1234'
        }
        // excute
        request(app)
        .post('/login')
        .send(body)
        .end((err, res) => {
            // err super test
            if (err) done(err)

            // asert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('access_token')
            done()
        })
    })
    it('should send response with 400 status code (wrong password) ', () => {
        // setup
        const body = {
            email: 'admin@mail.com', 
            password: 'testwrongpassword'
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
            expect(res.body).toHaveProperty('errors')
            expect (Array.isArray(res.body.errors)).toEqual(true)
            expect(res.body.errors).toEqual(
                expect.arryContaining(['email or password is undefined'])
            )
            done()
        })
    })
    it('should send response with 400 status code (blank input)', () => {
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
            expect(res.body).toHaveProperty('errors')
            expect (Array.isArray(res.body.errors)).toEqual(true)
            expect(res.body.errors).toEqual(
                expect.arryContaining(['email or password is undefined'])
            )
            done()
        })
    })
})