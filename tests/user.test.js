const request = require('supertest')
const app = require('../app')
// const { sequelize } = require('../models')
// const { queryInterface } = sequelize

describe('POST /login succes', () => {
    const validObj = {
        email: 'admin@mail.com',
        password: '123123'
    }
    test('Login succes', (done) => {
        request(app)
        .post('/login')
        .set('Accept', 'appication/json')
        .send(validObj)
        .then(response => {
            const {body, status} = response

            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err => done(err))
    })
})

describe('POST /login Fail', () => {
    test('Login fail no email in database', (done) => {
        request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({email: 'lalala@mail.com', password: '123123'})
        .then(response => {
            const {body, status} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'invalid email/password')
            done()
        })
        .catch(err => done(err))
    })
    test('Login fail wrong password', (done) => {
        request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({email: 'padang@mail.com', password: '1231234'})
        .then(response => {
            const {body, status} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'invalid email/password')
            done()
        })
        .catch(err => done(err))
    })
    test('Login fail not input email and password', (done) => {
        request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({email: '', password: ''})
        .then(response => {
            const {body, status} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'invalid email/password')
            done()
        })
        .catch(err => done(err))
    })
})
