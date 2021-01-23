const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize


beforeAll((done) => {

    const user1 = {
        email: 'admin2@mail.com',
        password: '1234',
        role: 'admin'
    }

    User.create(user1)
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
})

afterAll((done) => {
  queryInterface.bulkDelete('Users', null, {})
    .then(data => {
        done()
    })
    .catch(err => {
        console.log(err)
    })
})

describe('User', () => {

    describe('POST /login', () => {

        //TEST CASE 1
    
        it('should send response 200 status code', (done) => {
    
            const body = {
                email: 'admin2@mail.com',
                password: '1234',
            }
    
            request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('access_token')
    
                    done()
                })
        })

        //TEST CASE 2

        it('should send response 401 status code', (done) => {
    
            const body = {
                email: 'admin2@mail.com',
                password: '12345',
            }
    
            request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message')
                    expect(res.body.message).toEqual('Invalid email/password')
    
                    done()
                })
        })

        //TEST CASE 3

        it('should send response 401 status code', (done) => {
    
            const body = {
                email: 'admin2@mail.com',
                password: '',
            }
    
            request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message')
                    expect(res.body.message).toEqual('Invalid email/password')
    
                    done()
                })
        })

        //TEST CASE 4

        it('should send response 401 status code', (done) => {
    
            const body = {
                email: 'ad@mail.com',
                password: '',
            }
    
            request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message')
                    expect(res.body.message).toEqual('Invalid email/password')
    
                    done()
                })
        })
    })
})
