const request = require('supertest');

describe('POST /login', () => {
  // *Test jika berhasil
  it('should response with 200 status code', (done) => {
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
  it('should response with 400 status code', (done) => {
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
      expect(res.body.name).toHaveProperty('Bad Request');
      expect(res.body).toHaveProperty('message');
      expect(res.body.name).toHaveProperty('Email is required');
      done();
    })
  })

  // *Test jika email tidak ada di db
  it('should response with 400 status code', (done) => {
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
      expect(res.body.name).toHaveProperty('Bad Request');
      expect(res.body).toHaveProperty('message');
      expect(res.body.name).toHaveProperty('Invalid email/password');
      done();
    })
  })

  // *Test jika password kosong
  it('should response with 400 status code', (done) => {
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
      expect(res.body.name).toHaveProperty('Bad Request');
      expect(res.body).toHaveProperty('message');
      expect(res.body.name).toHaveProperty('Password is required');
      done();
    })
  })

  // *Test jika password tidak match
  it('should response with 400 status code', (done) => {
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
      expect(res.body.name).toHaveProperty('Bad Request');
      expect(res.body).toHaveProperty('message');
      expect(res.body.name).toHaveProperty('Password is required');
      done();
    })
  })
})