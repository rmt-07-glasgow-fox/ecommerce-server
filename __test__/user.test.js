const request = require("supertest");
const app = require("../app");
const clearUsers = require("./helpers/clear-products");
const models = require("../models");

describe("POST /api/users/login", () => {
  afterAll((done) => {
    models.sequelize.close();
    done();
  });

  // condition: all field filled with valid data
  // result: login success
  it("Login Success", (done) => {
    // Setup
    const body = {
      email: "admin@mail.com",
      password: "123456",
    };

    // Execute
    request(app)
      .post("/api/users/login")
      .send(body)
      .end((err, res) => {
        // Superset error handling
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("access_token");
        expect(typeof res.body.access_token).toEqual("string");

        done();
      });
  });

  // condition: email field filled with valid email but password is wrong
  // result: login failed
  it("Valid email, wrong password", (done) => {
    // setup
    const body = {
      email: "admin@mail.com",
      password: "wrongpassword",
    };

    // execute
    request(app)
      .post("/api/users/login")
      .send(body)
      .end((err, res) => {
        // superset error handler
        if (err) done(err);

        // assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Wrong password"])
        );

        done();
      });
  });

  // condition: email does not exist in db
  // result: login failed
  it("Email does not exist", (done) => {
    // setup
    const body = {
      email: "lolipop@mail.com",
      password: "lolipop",
    };
    // execute
    request(app)
      .post("/api/users/login")
      .send(body)
      .end((err, res) => {
        // superset error handler
        if (err) done(err);

        // assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Email does not exist"])
        );

        done();
      });
  });

  // condition: email fields is empty
  // result: login failed
  it("Email is empty", (done) => {
    // setup
    const body = {
      email: "",
      password: "123456",
    };
    // execute
    request(app)
      .post("/api/users/login")
      .send(body)
      .end((err, res) => {
        // superset error handler
        if (err) done(err);

        // assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Email is required"])
        );

        done();
      });
  });

  // condition: password fields is empty
  // result: login failed
  it("Password is empty", (done) => {
    // setup
    const body = {
      email: "admin@mail.com",
      password: "",
    };
    // execute
    request(app)
      .post("/api/users/login")
      .send(body)
      .end((err, res) => {
        // superset error handler
        if (err) done(err);

        // assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Password is required"])
        );

        done();
      });
  });
  // condition: email and password fields is empty
  // result: login failed
  it("Email and Password is empty", (done) => {
    // setup
    const body = {
      email: "",
      password: "",
    };
    // execute
    request(app)
      .post("/api/users/login")
      .send(body)
      .end((err, res) => {
        // superset error handler
        if (err) done(err);

        // assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Email and Password is required"])
        );

        done();
      });
  });
});

// describe('POST /api/users/register', () => {
//   afterAll((done) => {
//       models.sequelize.close()
//       done()
//   })

//   // condition: all field filled with valid data
//   // result: login success
//   it('should send response with 201 status code', (done) => {
//     // Setup
//     const body = {
//       email: 'andrianm28@hacktiv8.com',
//       password: 'lolipop28'
//     }

//     // Execute
//     request(app)
//     .post('/api/users/login')
//     .send(body)
//     .end((err, res) => {
//       // Superset error handling
//       if (err) done(err)

//       // Assert
//       expect(res.statusCode).toEqual(200)
//       expect(typeof res.body).toEqual('object')
//       expect(res.body).toHaveProperty('access_token')
//       expect(typeof res.body.access_token).toEqual('string')

//       done()
//     })
//   })

//   // condition: email field filled with valid email but password is wrong
//   // result: login failed
//   it('should send response with 400 status code', (done) => {
//     // setup
//     const body = {
//       email: 'admin@mail.com',
//       password: 'wrongpassword'
//     }

//     // execute
//     request(app)
//     .post('/api/users/login')
//     .send(body)
//     .end((err, res) => {
//       // superset error handler
//       if (err) done(err)

//       // assert
//       expect(res.statusCode).toEqual(400)
//       expect(typeof res.body).toEqual('object')
//       expect(res.body).toHaveProperty('errors')
//       expect(Array.isArray(res.body.errors)).toEqual(true)
//       expect(res.body.errors).toEqual(
//         expect.arrayContaining(['Wrong password'])
//       )

//       done()
//     })
//   })

//   // condition: email does not exist in db
//   // result: login failed
//   it('should send response with 400 status code', (done) => {
//     // setup
//     const body = {
//       email: 'lolipop@mail.com',
//       password: 'lolipop'
//     }
//     // execute
//     request(app)
//     .post('/api/users/login')
//     .send(body)
//     .end((err, res) => {
//       // superset error handler
//       if (err) done(err)

//       // assert
//       expect(res.statusCode).toEqual(400)
//       expect(typeof res.body).toEqual('object')
//       expect(res.body).toHaveProperty('errors')
//       expect(Array.isArray(res.body.errors)).toEqual(true)
//       expect(res.body.errors).toEqual(
//         expect.arrayContaining(['Email does not exist'])
//       )

//       done()
//     })
//   })

//   // condition: email and password fields is empty
//   // result: login failed
//   it('should send response with 400 status code', (done) => {
//     // setup
//     const body = {
//       email: '',
//       password: ''
//     }
//     // execute
//     request(app)
//     .post('/api/users/login')
//     .send(body)
//     .end((err, res) => {
//       // superset error handler
//       if (err) done(err)

//       // assert
//       expect(res.statusCode).toEqual(400)
//       expect(typeof res.body).toEqual('object')
//       expect(res.body).toHaveProperty('errors')
//       expect(Array.isArray(res.body.errors)).toEqual(true)
//       expect(res.body.errors).toEqual(
//         expect.arrayContaining(['Email is required'])
//       )

//       done()
//     })
//   })
// })
