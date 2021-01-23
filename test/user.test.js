const request = require('supertest')
const email = 'testing@mail.com';
const password = '123456qwerty';

describe('Login user POST /login', function() {
    describe('success login', function() {
        it('should send response 200 status code', function(done) {
            let body = {
                email: email,
                password: password
            }
            request(app)
                .post('/login')
                .send(body)
                .end(function (err, res) {
                    const {status, body} = res
                    if(err) done(err);
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('acces_token')
                    done();
                })
        })
    })
    describe('Error login', function() {
        it('should send response 400 status code - invalid password', function(done) {
            let body = {
                email: email,
                password:'wrong password'
            }
            request(app)
                .post('/login')
                .send(body)
                .end(function (res, send) {
                    const {body, status} = res
                    if(err) done(err);

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message','Invalid email or password')
                    done()
                })
        })
        it('should send response 400 status code - invalid email', function(done) {
            let body = {
                email: 'wrong email',
                password: password
            }
            request(app)
                .post('/login')
                .send(body)
                .end(function (res, send) {
                    const {body, status} = res
                    if(err) done(err);

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message','Invalid email or password')
                    done()
                })
        })
        it('should send response 401 status code - error email or password cannot be null', function(done) {
            let body = {
                email: '',
                password: ''
            }
            request(app)
                .post('/login')
                .send(body)
                .end(function (res, send) {
                    const {body, status} = res
                    if(err) done(err);

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message','Email or Password is required')
                    done()
                })
        })
    })
})