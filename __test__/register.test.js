const request = require('supertest');
const app = require('../app.js');
const clearUser = require('./helpers/testClearUser.js');
const models = require('../models/index.js');

describe('POST /register', () => {
  afterAll(done => {
    clearUser('johndoe@mail.com')
      .then(() => {
        models.sequelize.close();
        done();
      })
      .catch(err => console.log(err));
  });

  it('should send response with 201 status code', (done) => {
    // SETUP
    const body = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@mail.com',
      password: '123456'
    };
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
        expect(res.body).toHaveProperty('firstname');
        expect(res.body.firstname).toEqual(body.firstname);
        expect(res.body).toHaveProperty('lastname');
        expect(res.body.lastname).toEqual(body.lastname);
        expect(res.body).toHaveProperty('email');
        expect(res.body.email).toEqual(body.email);

        done();
      });
  });
  it('should send response with 400 status code', (done) => {
    // SETUP
    const body = {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    };
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
        expect(res.body.errors).toEqual(expect.arrayContaining(['First name is required']));
        expect(res.body.errors).toEqual(expect.arrayContaining(['The length of first name must be less than 50 characters.']));
        expect(res.body.errors).toEqual(expect.arrayContaining(['Email is required']));
        expect(res.body.errors).toEqual(expect.arrayContaining(['Format email is invalid']));
        expect(res.body.errors).toEqual(expect.arrayContaining(['The length of email must be less than 50 characters.']));
        expect(res.body.errors).toEqual(expect.arrayContaining(['You need password for security reason.']));
        expect(res.body.errors).toEqual(expect.arrayContaining(['Minimal and maximal password length is 4 - 50 characters']));

        done();
      });
  });
});