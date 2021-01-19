const request = require("supertest");
const models = require("../models");
const app = require("../app");
// const { clearCategory } = require('./helpers/clearDb');

describe("POST /categories", () => {
  let access_token = "";
  beforeAll((done) => {
    request(app)
      .post("/login")
      .send({
        email: "admin@mail.com",
        password: "123456",
      })
      .end((err, res) => {
        access_token = res.body.access_token;
        done();
      });
  });

  afterAll((done) => {
    // clearCategory()
    // .then( _=> {
    //     models.sequelize.close();
    //     done();
    // })
    // .catch(err, console.log(err))
    models.sequelize.close();
    done();
  });

  it("POST /category should response with status code 201", (done) => {
    const body = {
      name: "Basics",
    };

    request(app)
      .post("/categories")
      .set("access_token", access_token)
      .send(body)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("createdAt");
        expect(res.body).toHaveProperty("updatedAt");
        expect(res.body).toEqual({
          id: expect.any(Number),
          name: "Basics",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
        done();
      });
  });

  it("POST /category should response with status code 400", (done) => {
    const body = {
      name: "",
    };

    request(app)
      .post("/categories")
      .set("access_token", access_token)
      .send(body)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(Array.isArray(res.body)).toBe(true);
        res.body.map((err) => {
          expect(err).toHaveProperty("message");
          expect(err).toEqual({
            message: "Please input category name between 3 to 20 characters",
          });
        });
        done();
      });
  });
});
