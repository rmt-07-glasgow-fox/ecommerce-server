const request = require('supertest')
const app = require('../app')
// const { sequelize } = require('../models')
// const { queryInterface } = sequelize

const validUser = {
    email: 'admin@mail.com',
    password: '1234',
    role: 'admin'
}


// afterAll((done) => {
//     queryInterface.bulkDelete('Users')
//     .then(() => {
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
// })

describe('POST /adminLogin success', () => {
    test('Login success', (done) => {
        request(app)
        .post('/adminLogin')
        .set('Accept', 'application/json')
        .send(validUser)
        .then(response => {
            const {body, status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

describe('POST /adminLogin failed', () => {
    test('Login failed wrong password', (done) => {
        request(app)
        .post('/adminLogin')
        .set('Accept', 'application/json')
        .send({
            email: 'user@mail.com',
            password: 'ngasal'
        })
        .then(response => {
            // console.log(response, '<<response');
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Invalid email / password')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    test('Login failed wrong email', (done) => {
        request(app)
        .post('/adminLogin')
        .set('Accept', 'application/json')
        .send({
            email: 'ngasal@mail.com',
            password: '1234'
        })
        .then(response => {
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Invalid email / password')
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})