const request = require("supertest");
const models = require("../models");
const app = require("../app");

describe("POST /login", () => {
  afterAll((done) => {
    models.sequelize.close();
    done();
  });

  it("POST /login should response with status code 200", (done) => {
    // setup
    const body = {
      email: "admin@mail.com",
      password: "123456",
    };
    // execute
    request(app)
      .post("/login")
      .send(body)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        // assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("access_token");
        expect(res.body).toEqual({
          access_token: expect.any(String),
        });
        done();
      });
  });

  it("POST /login should response with status code 400", (done) => {
    //setup
    const body = {
      email: "",
      password: "",
    };
    // execute
    request(app)
      .post("/login")
      .send(body)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        // assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual({
          message: `Wrong email or password`,
        });
        done();
      });
  });
});
