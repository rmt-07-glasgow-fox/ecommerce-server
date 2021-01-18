const request = require('supertest');
const app = require('../app.js');
const models = require('../models/index.js');


describe('POST /login', () => {
  afterAll(done => {
    models.sequelize.close();
    done();
  });

  it('should send response with 200 status code', (done) => {
    // SETUP
    const body = {
      email: 'admin@mail.com',
      password: '123456'
    };
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
  it('should send response with 401 status code', (done) => {
    // SETUP
    const body = {
      email: 'admin@mail.co',
      password: '12345'
    };
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
        expect(res.body.errors).toEqual('Your Email or Password is invalid');

        done();
      });
  });
});