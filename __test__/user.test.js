const request = require('supertest');
const app = require('../app')
const { hashPassword } = require('../helpers/bcryptjs')
const { sequelize } = require('../models')

beforeAll(done => {
    sequelize.queryInterface.bulkInsert('Users', [
        {
            email: 'admin@mail.com',
            password: hashPassword('admin123'),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'customer@mail.com',
            password: hashPassword('customer123'),
            role: 'customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {})
    .then(data => done())
    .catch(err => done(err))
})

afterAll(done => {
    sequelize.queryInterface.bulkDelete('Users', null, {})
    .then(data => {
        done()
        sequelize.close()
    })
    .catch(err => {
        done(err)
    })
})

describe(`POST /login/admin`, () => {
    test(`Success`, (done) => {
        request(app)
            .post('/login/admin')
            .send({
                email: 'admin@mail.com',
                password: 'admin123'
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('access_token', expect.any(String))
                done()
            })
    })

    test(`Wrong email`, (done) => {
        request(app)
            .post('/login/admin')
            .send({
                email: 'Admin@mail.com',
                password: 'admin123'
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', `Wrong Email or Password`)
                done()
            })
    })

    test(`Wrong password`, (done) => {
        request(app)
            .post('/login/admin')
            .send({
                email: 'admin@mail.com',
                password: 'admin1234'
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', `Wrong Email or Password`)
                done()
            })
    })

    test(`Use Customer role`, (done) => {
        request(app)
            .post('/login/admin')
            .send({
                email: 'customer@mail.com',
                password: 'customer123'
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(403)
                expect(res.body).toHaveProperty('message', `You Don't Have Access To This Panel`)
                done()
            })
    })

    test(`Email which isn't registered in database`, (done) => {
        request(app)
            .post('/login/admin')
            .send({
                email: 'fakeadmin@mail.com',
                password: 'admin'
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', `Wrong Email or Password`)
                done()
            })
    })

    test(`No email and password input`, (done) => {
        request(app)
            .post('/login/admin')
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', `Wrong Email or Password`)
                done()
            })
    })
})