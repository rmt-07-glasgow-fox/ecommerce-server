const request = require("supertest")
const app = require("../app")
const models = require('../models')

describe('GET /products', function () {
  afterAll((done) => {
    models.sequelize.close()
    done()
  })

  it('should send response with status code 200', function (done) {
    //execute
    request(app)
      .get('/products')
      .end(function (err, res) {
        if (err) done(err)

        //assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');

        done()
      });
  });

});