const request = require('supertest');
const app = require('../app.js');
const models = require('../models');


/* =======================================================
   #################### TEST REGISTER ####################
   ======================================================= */

describe('POST /register', () => {
  // *Test jika berhasil
  it('Register should response with 201 status code', (done) => {
    // setup
    const body = {
      email: 'admin@mail.com',
      password: '123456',
      role: 'admin'
    }
    // Execute
    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(201);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('message');
      expect(typeof res.body.message).toEqual('string');
      expect(res.body.message).toEqual('Success create user');
      done();
    })
  })

  // *Test jika email sudah ada di db
  it('If duplicate email should response with 400 status code', (done) => {
    // setup
    const body = {
      email: 'admin@mail.com',
      password: '123456',
      role: 'admin'
    }
    // Execute
    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.name).toEqual('Bad Request');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Email already exists'])
      )
      done();
    })
  })

  // *Test jika email kosong
  it('If email empty should response with 400 status code', (done) => {
    // setup
    const body = {
      email: '',
      password: '123456',
      role: 'admin'
    }

    // Execute
    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.name).toEqual('Bad Request');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Email is required'])
      )
      done();
    })
  })

  // *Test jika password kosong
  it('If password empty should response with 400 status code', (done) => {
    // setup
    const body = {
      email: 'admin@mail.com',
      password: '',
      role: 'admin'
    }

    // Execute
    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.name).toEqual('Bad Request');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Password is required'])
      )
      done();
    })
  })

  // *Test jika role kosong
  it('If role empty should response with 400 status code', (done) => {
    // setup
    const body = {
      email: 'admin@mail.com',
      password: '123456',
      role: ''
    }

    // Execute
    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.name).toEqual('Bad Request');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Role is required'])
      )
      done();
    })
  })

  // *Test jika format email salah
  it('If not email should response with 400 status code', (done) => {
    // setup
    const body = {
      email: 'admin.mail.com',
      password: '123456',
      role: 'admin'
    }

    // Execute
    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.name).toEqual('Bad Request');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Invalid email address'])
      )
      done();
    })
  })

  // *Test jika password kurang dari 6 karakter
  it('If password less than 6 characters should response with 400 status code', (done) => {
    // setup
    const body = {
      email: 'admin@mail.com',
      password: '123',
      role: 'admin'
    }

    // Execute
    request(app)
    .post('/register')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.name).toEqual('Bad Request');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Password at least 6 characters'])
      )
      done();
    })
  })
})

/* =======================================================
   #################### TEST LOGIN #######################
   ======================================================= */

describe('POST /login', () => {

  afterAll( async () => {
    // if(process.env.NODE_ENV === 'test') {
    //   await models.User.destroy({ where: {} });
    // }    
    models.sequelize.close();
  })

  // *Test jika berhasil
  it('Login should response with 200 status code', (done) => {
    // setup
    const body = {
      email: 'admin@mail.com',
      password: '123456',
    }

    // Execute
    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err) done(err);
      // Assert
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('access_token');
      expect(typeof res.body.access_token).toEqual('string');
      done();
    })
  })

  // *Test jika email kosong
  it('If email empty should response with 400 status code', (done) => {
    // setup
    const body = {
      email: '',
      password: '123456',
    }

    // Execute
    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual('Bad Request');
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Email is required');
      done();
    })
  })

  // *Test jika email tidak ada di db
  it('If email not found should response with 400 status code', (done) => {
    // setup
    const body = {
      email: 'random@mail.com',
      password: '123456',
    }

    // Execute
    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual('Bad Request');
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Invalid email/password');
      done();
    })
  })

  // *Test jika password kosong
  it('If password empty should response with 400 status code', (done) => {
    // setup
    const body = {
      email: 'random@mail.com',
      password: '',
    }

    // Execute
    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual('Bad Request');
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Password is required');
      done();
    })
  })

  // *Test jika password tidak match
  it('If password incorrect should response with 400 status code', (done) => {
    // setup
    const body = {
      email: 'admin@mail.com',
      password: '654321',
    }

    // Execute
    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual('Bad Request');
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Invalid email/password');
      done();
    })
  })
})