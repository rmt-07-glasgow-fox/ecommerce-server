const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { hashPassword } = require('../helpers/bcrypt')

beforeAll(done => {
    queryInterface.bulkInsert('Users', [{
        email: 'user@mail.com',
        password: hashPassword('okokok'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {returning: true })
        .then(user => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

afterAll(done => {
    queryInterface.bulkDelete('Users')
        .then(user => {
            done()
        })
        .catch(err => {
            done(err)
        })
})


describe('Login User POST /login', () => {
    describe ('Login Success', () => {
        it('success login', (done) => {
            request(app)
                .post('/login')
                .send({email: 'example@gmail.com', password: 'okokok'})
                .end((err, res) => {
                    const { status, body } = res
                    if(err)return done(err)
                    .expect(status).toBe(400)
                    .expect(body).toHaveProperty(
                        'access_token',
                        expect.any(String)
                    )
                    done()
                })
        })
    })
    describe('Fail Login', () => {
        it('Login Failed Because Email not exist in db', done => {
            request(app)
                .post('/login')
                .send({email: 'wadidaw@gmail.com', password: 'okokok'})
                .end((err, res) => {
                    const { status, body } = res
                    if(err)return done(err)
                    .expect(status).toBe(400)
                    .expect(body).toHaveProperty('msg', 'Invalid email/password')
                    done()
                })
        })
        it('Login Failed Because Password not Match', done => {
            request(app)
                .post('/login')
                .send({email: 'example@gmail.com', password: ''})
                .end((err, res) => {
                    const { status, body } = res
                    if(err)return done(err)
                    .expect(status).toBe(400)
                    .expect(body).toHaveProperty('msg', 'Invalid email / password')
                    done()
                })
        })
        it('Login Failed Because Field Email / password Undefined', done => {
            request(app)
                .post('/login')
                .end((err, res) => {
                    const { status, body } = res
                    if(err)return done(err)
                    .expect(status).toBe(400)
                    .expect(body).toHaveProperty('msg', 'Please Enter Email / Password')
                    done()
                })
        })
    })
})