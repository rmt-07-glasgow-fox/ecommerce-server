const request = require('supertest');
const app = require('../app');
const models = require('../models/index');
const clearDb = require('./helpers/clearDb');

describe('POST /products success', function() {
  afterAll(function() {
    clearDb()
      .then(() => {
        models.sequelize.close();
      })
      .catch((err) => {
        throw err;
      });
  });

  let access_token = null;

  beforeAll(function(done) {
    let body = {
      email: "admin@mail.com",
      password: "123456"
    };

    request(app)
        .post("/login")
        .send(body)
        .end(function(err, res) {
          if (err) done(err)

          access_token = res.body.access_token;

          done();
        });
  });

  it('should send reponse with 200 status code', function(done) {
      let body = {
          name: "Buku",
          image_url: "",
          price: 70000,
          stock: 20
      };
      
      request(app)
        .post("/products")
        .send(body)
        .set('access_token', access_token)
        .end(function(err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(201);

          done();
        });
  });
});