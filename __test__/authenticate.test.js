const request = require('supertest');
const model = require('../models')
const app = require('../app');
const clearUser = require('./helpers/clear-user');

describe('Authenticate', () => {
    afterAll(async(done) => {
        try {
            await clearUser();
            await model.sequelize.close();
            done();
        } catch (error) {
            console.log(error);
        }
    });

    describe('POST /login', () => {
        // SUCESS CASE
        it('should send response 200 status code', (done) => {
            //SETUP
            const body = {
                email: 'm.trinandanoviardy@gmail.com',
                password: 'qwerty'
            }

            // EXECUTE
            request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    if (err) done(err);

                    // ASSERT
                    expect(res.statusCode).toEqual(200);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('access_token');
                    expect(typeof res.body.access_token).toEqual('string');

                    done();
                });
        });

        // ERROR CASE
        // EMAIL DON'T EXIST
        it('email don\'t exist should send response 401', (done) => {
            // SETUP
            const body = {
                email: 'isnanali@gmail.com',
                password: 'azaza'
            }

            // EXECUTE
            request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    if (err) done(err);

                    // ASSERT
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(res.body.errors).toEqual('username or password wrong!');

                    done();
                });
        });

        // EMAIL EXIST BUT PASSWORD WRONG
        it('email exist but password wrong should send response 401', (done) => {
            // SETUP
            const body = {
                email: 'm.trinandanoviardy@gmail.com',
                password: 'azaza'
            }

            // EXECUTE
            request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    if (err) done(err);

                    // ASSERT
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(res.body.errors).toEqual('username or password wrong!');

                    done();
                })
        })

        // EMAIL EXIST BUT PASSWORD EMPTY
        it('email exist but password empty should send response 401', (done) => {
            // SETUP
            const body = {
                email: 'm.trinandanoviardy@gmail.com',
                password: ''
            }

            // EXECUTE
            request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    if (err) done(err);

                    // ASSERT
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(res.body.errors).toEqual('username or password wrong!');

                    done();
                })
        })

        // EMAIL & PASSWORD EMPTY
        it('email & password empty should send response 401', (done) => {
            // SETUP
            const body = {
                email: '',
                password: ''
            }

            // EXECUTE
            request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    if (err) done(err);

                    // ASSERT
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(res.body.errors).toEqual('username or password wrong!');

                    done();
                });
        });
    });

    describe('POST /register', () => {
        // SUCCESS CASE
        it('should send response 200 status code', (done) => {
            // SETUP
            const body = {
                email: 'qaqa@mail.com',
                password: 'qwerty',
                role: 'admin'
            }

            // EXECUTE
            request(app)
                .post('/register')
                .send(body)
                .end((err, res) => {
                    if (err) done(err);

                    // ASSERT
                    expect(res.statusCode).toEqual(201);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('id');
                    expect(typeof res.body.id).toEqual('number');
                    expect(res.body).toHaveProperty('email');
                    expect(res.body.email).toEqual(body.email);
                    expect(res.body).toHaveProperty('role');
                    expect(res.body.role).toEqual(body.role);

                    done()
                });
        });

        // ERROR CASE
        // ERROR VALIDATION
        it('should send response 400 status code', (done) => {
            // SETUP
            const body = {
                email: '',
                password: '',
                role: ''
            }

            // EXECUTE
            request(app)
                .post('/register')
                .send(body)
                .end((err, res) => {
                    if (err) done(err);

                    // ASSERT
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['field email is required']),
                        expect.arrayContaining(['invalid email']),
                        expect.arrayContaining(['field password is required']),
                        expect.arrayContaining(['password at least have 6 character']),
                        expect.arrayContaining(['role should be one of admin or customer']),
                    );

                    done();
                });
        });

        // EMAIL UNIQUE
        it('email must unique should send response 400 status code', (done) => {
            // SETUP
            const body = {
                email: 'm.trinandanoviardy@gmail.com',
                password: 'qwerty',
                role: 'admin'
            }

            // EXECUTE
            request(app)
                .post('/register')
                .send(body)
                .end((err, res) => {
                    if (err) done(err);

                    // ASSERT
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['email must be unique']),
                    );

                    done();
                });
        });

        // ROLE EMPTY
        it('role must be one of admin or customer should send response 400 status code', (done) => {
            // SETUP
            const body = {
                email: 'm.trinandanoviardy@gmail.com',
                password: 'qwerty',
                role: ''
            }

            // EXECUTE
            request(app)
                .post('/register')
                .send(body)
                .end((err, res) => {
                    if (err) done(err);

                    // ASSERT
                    expect(res.statusCode).toEqual(400);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('errors');
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['role should be one of admin or customer']),
                    );

                    done();
                });
        });
    })
})