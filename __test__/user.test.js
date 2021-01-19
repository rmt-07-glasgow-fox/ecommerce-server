const request = require('supertest');
const app = require('../app.js');
const models = require('../models/index.js');
const clearUser = require('./helpers/testClearUser.js');

describe('User Test Suite', () => {
  afterAll(done => {
    clearUser('johndoe@mail.com')
      .then(() => clearUser('siri@mail.com'))
      .then(() => {
        models.sequelize.close();
        done();
      })
      .catch(err => console.log(err));
  });

  describe('POST /register', () => {
    it('should send response with 201 status code if success created', (done) => {
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
    it('should send response with 201 status code if success created even though last name is empty', (done) => {
      // SETUP
      const body = {
        firstname: 'Siri',
        lastname: '',
        email: 'siri@mail.com',
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
          expect(res.body.lastname).toEqual(body.firstname);
          expect(res.body).toHaveProperty('email');
          expect(res.body.email).toEqual(body.email);

          done();
        });
    });
    it('should send response with 409 status code if account is already created', (done) => {
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
          expect(res.statusCode).toEqual(409);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(expect.arrayContaining(['email must be unique']));

          done();
        });
    });
    it('should send response with 400 status code if all fields are empty', (done) => {
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
    it('should send response with 400 status code if all fields are null', (done) => {
      // SETUP
      const body = {
        firstname: null,
        lastname: null,
        email: null,
        password: null
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['User.firstname cannot be null']));
          expect(res.body.errors).toEqual(expect.arrayContaining(['User.email cannot be null']));
          expect(res.body.errors).toEqual(expect.arrayContaining(['User.password cannot be null']));

          done();
        });
    });
    it('should send response with 400 status code if first name field is empty', (done) => {
      // SETUP
      const body = {
        firstname: '',
        lastname: 'test',
        email: 'test@test.com',
        password: '123456'
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

          done();
        });
    });
    it('should send response with 400 status code if first name length more than 50 characters', (done) => {
      // SETUP
      const body = {
        firstname: 'abcdefghijklmnopqrstuvwxyz123456789012345678901234567890aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz',
        lastname: 'c',
        email: 'test@test.com',
        password: '123456'
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['The length of first name must be less than 50 characters.']));

          done();
        });
    });
    it('should send response with 400 status code if first name is null', (done) => {
      // SETUP
      const body = {
        firstname: null,
        lastname: 'test',
        email: 'test@mail.com',
        password: '123456'
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['User.firstname cannot be null']));


          done();
        });
    });
    it('should send response with 400 status code if email format is invalid', (done) => {
      // SETUP
      const body = {
        firstname: 'Test',
        lastname: 'cc',
        email: 'invalidemail',
        password: '123456'
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['Format email is invalid']));

          done();
        });
    });
    it('should send response with 400 status code if email field is empty', (done) => {
      // SETUP
      const body = {
        firstname: 'Test',
        lastname: 'ca',
        email: '',
        password: '123456'
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['Email is required']));

          done();
        });
    });
    it('should send response with 400 status code if email length more than 50 characters', (done) => {
      // SETUP
      const body = {
        firstname: 'test',
        lastname: 'test',
        email: 'abcdefghijklmnopqrstuvwxyz123456789012345678901234567890aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz@mail.com',
        password: '123456'
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['The length of email must be less than 50 characters.']));

          done();
        });
    });
    it('should send response with 400 status code if email is null', (done) => {
      // SETUP
      const body = {
        firstname: 'test',
        lastname: 'test',
        email: null,
        password: '123456'
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['User.email cannot be null']));

          done();
        });
    });
    it('should send response with 400 status code if password field is empty', (done) => {
      // SETUP
      const body = {
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['You need password for security reason.']));

          done();
        });
    });
    it('should send response with 400 status code if password length less than 4 characters', (done) => {
      // SETUP
      const body = {
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'tes'
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['Minimal and maximal password length is 4 - 50 characters']));

          done();
        });
    });
    it('should send response with 400 status code if password length more than 50 characters', (done) => {
      // SETUP
      const body = {
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz01928374655647382910lalalalala'
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['Minimal and maximal password length is 4 - 50 characters']));

          done();
        });
    });
    it('should send response with 400 status code if all fields are null', (done) => {
      // SETUP
      const body = {
        firstname: 'test',
        lastname: 'test',
        email: 'test@mail.com',
        password: null
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
          expect(res.body.errors).toEqual(expect.arrayContaining(['User.password cannot be null']));

          done();
        });
    });
  });

  describe('POST /login', () => {
    it('should send response with 200 status code if success login', (done) => {
      // SETUP
      const body = {
        email: 'admin@mail.com',
        password: '1234'
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
    it('should send response with 401 status code if email and password fields are empty', (done) => {
      // SETUP
      const body = {
        email: 'adminzzz@mail.com',
        password: '1234'
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
    it('should send response with 401 status code if email and password fields are invalid', (done) => {
      // SETUP
      const body = {
        email: 'adminzzz@mail.com',
        password: 'aia11111111'
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
    it('should send response with 401 status code if email is invalid', (done) => {
      // SETUP
      const body = {
        email: '',
        password: ''
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
    it('should send response with 401 status code if email is empty', (done) => {
      // SETUP
      const body = {
        email: '',
        password: '1234'
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
    it('should send response with 401 status code if password is invalid', (done) => {
      // SETUP
      const body = {
        email: 'admin@mail.com',
        password: '11111111111111'
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
    it('should send response with 401 status code if password is empty', (done) => {
      // SETUP
      const body = {
        email: 'admin@mail.com',
        password: ''
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
})
