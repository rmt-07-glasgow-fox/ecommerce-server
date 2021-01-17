const request = require('supertest');
const app = require('../app');
const models = require('../models/index');

describe('POST /login', function() {
  afterAll(function() {
    models.sequelize.close();
  });

  it('Should send reponse with 200 status code', function(done) {
    // Setup
    let body = {
        email: "admin@mail.com",
        password: "123456"
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function(err, res) {
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(200);

        done();
      });
  });

  it('Should send reponse with 400 status code', function(done) {
    // Setup
    let body = {
      email: "admin@mail.com",
      password: "111111"
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function(err, res) {
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual(expect.arrayContaining(['Invalid email or password']));

        done();
      });
  });

  it('Should send reponse with 400 status code', function(done) {
    // Setup
    let body = {
      email: "admin11@mail.com",
      password: "111111"
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function(err, res) {
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual(expect.arrayContaining(['Invalid email or password']));

        done();
      });
  });

  it('Should send reponse with 400 status code', function(done) {
    // Setup
    let body = {
      email: "",
      password: ""
    };
    // Execute
    request(app)
      .post("/login")
      .send(body)
      .end(function(err, res) {
        if (err) done(err)

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual(expect.arrayContaining(['Invalid email or password']));

        done();
      });
  });
});