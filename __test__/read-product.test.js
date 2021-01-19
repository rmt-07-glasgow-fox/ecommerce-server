const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jsonwebtoken')
const { User } = require('../models')

let access_token_admin
let access_token_user

beforeAll((done)=> {
    User.findOne({
        where: { email: 'admin@mail.com'}
    })
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token_admin = generateToken(payload)
            return User.findOne({
                where: { email: 'user@mail.com'}
            })
        })
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token_user = generateToken(payload)

            done()
        })
        .catch(err => {
            done(err)
        })
})

describe('GET /products', ()=> {
    it('should send response with 200 status code', (done) => {
        request(app)
            .get('/products')
            .set('access_token', access_token_admin)
            .end((err, res) => {
                if (err) done(err)

                // console.log(res)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')

                done()
            })
    })

    it('should send response with 200 status code', (done) => {
        request(app)
            .get('/products')
            .set('access_token', access_token_user)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                
                done()
            })
    })

    it('should send response 401 "You need to login first"', (done) => {
        request(app)
            .get('/products')
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(401)
                expect(res.body).toHaveProperty('message', 'You need to login first')
                
                done()
            })
    })
})