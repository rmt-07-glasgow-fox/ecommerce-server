const request = require('supertest');
const app = require('../app')

const { User, Product } = require('../models/index')
const { hashPassword, checkPassword} = require('../helpers/bcrypt')
const { generateToken, checkToken } = require('../helpers/jwt')
const models = require('../models/index')

//initialize user
beforeAll((done) => {
  let payload = {
    email: 'admin@mail.com',
    password: 'qweqwe',
    role: 'admin'
  }
  User.create(payload)
  .then((data) => {
    done()
  })
  .catch((err) => {
    done(err)
  })
})

//clear DB
afterAll((done) => {
  if(process.env.NODE_ENV === 'test') {
    User.destroy({where:{}})
    .then(() => {
      models.sequelize.close()
      done()
    })
    .catch((err) => {
      done(err)
    })
  }
})

describe('POST/login', function() { 
  it('Success login', function(done) { // done parameter -> callback from supertest
    //setup
    const payload = {
      email: 'admin@mail.com',
      password: 'qweqwe',
    }
    //execute
    request(app)
    .post('/login') //method
    .send(payload) //request body
    .end(function(err, res) {
      if (err) done (err);

      //assert
      expect(res.statusCode).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('access_token')
      done()
    })
  })

  it('Failed login, email not registered in DB', function(done) {
    //setup
    const payload = {
      email: 'admin12345@mail.com',
      password: 'qweqwe',
    }
    //execute
    request(app)
    .post('/login')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);

      //assert
      expect(res.statusCode).toEqual(404)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      done()
    })
  })

  it('Failed login, password invalid', function(done) {
    //setup
    const payload = {
      email: 'admin@mail.com',
      password: 'bebekgoreng',
    }
    //execute
    request(app)
    .post('/login')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      
      //assert
      expect(res.statusCode).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      done()
    })
  })

  it('Failed login, email and password empty', function(done) {
    //setup
    const payload = {
      email: '',
      password: '',
    }
    //execute
    request(app)
    .post('/login')
    .send(payload)
    .end(function(err, res) {
      if (err) done (err);
      
      //assert
      expect(res.statusCode).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      done()
    })
  })

  
})