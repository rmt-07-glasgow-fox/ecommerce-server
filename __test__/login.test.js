const request = require('supertest')
const app = require('../app')
const { User } = require('../models/index')
const { clearDB, clearDBUser } = require('../helpers/clearDB')

const customer = {
    email: 'daniela@gmail.com',
    password: '123456',
    role: ''
}

beforeAll((done) => {
    User.create(customer)
    .then(data => {
        done()       
    })
    .catch(err => {
        console.log(err);
    });
});

afterAll(function (done) {
    clearDB()
    .then( (data) => {
        return clearDBUser()
    })
    .then( (data) => {
        done()
    })
    .catch( err => {
        console.log(err);
    })
})

describe('POST /login', function() {
    it('should send response with 200 status code', function (done) {
        //setup
        const body = {
            email: 'daniela@gmail.com',
            password: '123456'
        }
        // execute
        request(app)
            .post('/login')
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                // assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('email')
                expect(res.body).toHaveProperty('access_token')
                expect(typeof res.body.id).toEqual('number')
                expect(typeof res.body.email).toEqual('string')
                expect(typeof res.body.access_token).toEqual('string')

                done()
            })
    })
       
    it('should send response with 401 status code', function (done) {
        // setup
        const body = {
            email: '',
            password: ''
        }
        // execute
        request(app)
            .post('/login')
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                // assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid email or password')

                done()
            })
    })
})