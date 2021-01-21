const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const {hashPassword} = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
let access_token;

describe('POST /admin/login', () => {
  beforeAll((done) => {
    sequelize.queryInterface.bulkInsert("Users", [
      {
        first_name: "John",
        last_name: "Doe",
        email: "admin@mail.com",
        password: hashPassword("1234"),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        email: "customer@mail.com",
        password: hashPassword("1234"),
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true })
    .then(user => {
      access_token = generateToken(user[0].id, user[0].email, user[0].role)
      done();
    })
    .catch((err) => {
      done(err);
    })
  });
  afterAll(done => {
    sequelize.queryInterface.bulkDelete('Users')
    .then(response => {
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('should send response with 200', (done) => {
    //setup
    const body = {
      email: "admin@mail.com",
      password: "1234"
    }
    //execute
    request(app)
    .post('/admin/login')
    .send(body)
    .end((err,res) => {
      if(err) done(err);
      //assert
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('access_token');
      done();
    })
  })
  it('should send response with 401', (done) => {
    //setup
    const body = {
      email: "admin@mail.com",
      password: "12345"
    }
    //execute
    request(app)
    .post('/admin/login')
    .send(body)
    .end((err,res) => {
      if(err) done(err);
      //assert
      expect(res.status).toEqual(401);
      done();
    })
  })
  it('should send response with 401', (done) => {
    //setup
    const body = {
      email: "fakeadmin@mail.com",
      password: "1234"
    }
    //execute
    request(app)
    .post('/admin/login')
    .send(body)
    .end((err,res) => {
      if(err) done(err);
      //assert
      expect(res.status).toEqual(401);
      done();
    })
  })
  it('should send response with 401', (done) => {
    //setup
    const body = {
      email: "",
      password: ""
    }
    //execute
    request(app)
    .post('/admin/login')
    .send(body)
    .end((err,res) => {
      if(err) done(err);
      //assert
      expect(res.status).toEqual(401);
      done();
    })
  })
})