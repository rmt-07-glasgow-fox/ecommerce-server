const request = require('supertest');
const app = require('../app');

describe('Login', () => {
  it('should send response with 200 status code', (done) => {
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

  it('should send response with 400 status code', (done) => {
    const body = {
      email: '',
      password: '',
    };

    request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Email is required'])
        );
      });
  });
});
