const request = require('supertest');
const app = require('../app');
const models = require('../models');

describe('Login', () => {
  afterAll((done) => {
    models.sequelize.close();
    done();
  });

  it('Enter valid email and valid password', (done) => {
    const body = {
      email: 'admin@mail.com',
      password: '1234567890',
    };

    request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('access_token');

        done();
      });
  });

  it('Enter empty email and empty password', (done) => {
    const body = {
      email: '',
      password: '',
    };

    request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(422);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([
            { message: 'Must provide email and password' },
          ])
        );

        done();
      });
  });

  it('Enter valid email and empty password', (done) => {
    const body = {
      email: 'admin@mail.com',
      password: '',
    };

    request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(422);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([
            { message: 'Must provide email and password' },
          ])
        );

        done();
      });
  });

  it('Enter valid email and invalid password', (done) => {
    const body = {
      email: 'admin@mail.com',
      password: '123456789',
    };

    request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Invalid email or password' }])
        );

        done();
      });
  });
});
