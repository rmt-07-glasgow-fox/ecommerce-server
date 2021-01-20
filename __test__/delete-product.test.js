const request = require("supertest")
const app = require("../app")
const models = require('../models')

describe('DELETE /products/:id', function () {
  let token
  beforeAll((done) => {
    const body = {
      email: "admin@mail.com",
      password: "1234"
    };

    request(app)
      .post('/users/login')
      .send(body)
      .end(function (err, res) {
        if (err) done(err)
        token = res.body.access_token
        done()
      });

  })

  afterAll((done) => {
    models.sequelize.close()
    done()
  })

  it('should send response with status code 200', function (done) {
    //execute
    request(app)
      .delete('/products/31')
      .set('access_token', token)
      .end(function (err, res) {
        if (err) done(err)

        //assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body.message).toEqual('Product success to delete');

        done()
      });
  });

  it('should send response with status code 400', function (done) {
    request(app)
      .delete('/products/2')
      .end(function (err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(400);        
        done()
      })
  })
});