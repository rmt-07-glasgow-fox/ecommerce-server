const request = require('supertest')
const app = require('../app')

const userObjValid = { email: 'admin@mail.com', password: 'admin123', role: 'admin'}

describe( 'POST /login success', ()=> {
    test('login success', (done)=> {
        request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({email: userObjValid.email, password: userObjValid.password})
        .then( response => {
            const { status, body } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch( err => {
            done(err)
        })
    })
})

describe( 'POST /login failed', ()=> {
    test('login failed, wrong password', (done)=> {
        request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({email: 'admin@mail.com', password: 'salah123'}) 
        .then( response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Invalid Email or Password')
            done()
        })
        .catch( err => {
            done(err)
        })
    })

    test('login failed, email does not exist in the database', (done)=> {
        request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({email: 'user@mail.com', password: 'admin123'})
        .then( response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Invalid Email or Password')
            done()
        })
        .catch( err => {
            done(err)
        })
    })

    test('login failed, email/password not empty', (done)=> {
        request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({email: '', password: ''})
        .then( response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Email or password cannot be empty')
            done()
        })
        .catch( err => {
            done(err)
        })
    })
})