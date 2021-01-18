const request = require('supertest');
const model = require('../models')
const app = require('../app')

describe('POST /login', () => {
    afterAll(async(done) => {
        try {
            await model.sequelize.close();
            done();
        } catch (error) {
            console.log(error);
        }
    });

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