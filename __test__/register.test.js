const request = require('supertest')
const app = require('../app')
const { clearUser } = require('./helpers/clearDB')
const models = require('../models')

describe('Test register', () => {
  afterAll(function(done) {
    clearUser()
      .then(() => {
        models.sequelize.close()
        done()
      })
      .catch(err => {
        console.log(err, '<<<<<<<< di test register afterall');
      })
  })
  it('should response StatCode (201) - Created', function (done) {
    // Setup
    const input = {
      email: 'test@mail.com',
      password: 'qwe123'
    }
    // Execute
    request(app)
      .post('/register')
      .send(input)
      .end(function (err, res) {
        // Error supertest
        if (err) {
          done(err)
        }
        // Assert
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('email')
        done()
      })
    
  })

  it('should response StatCode (400) - Bad Request (email)', function (done) {
    // Setup
    const input = {
      email: 'test.mail.com',
      password: 'qwe123'
    }
    // Execute
    request(app)
      .post('/register')
      .send(input)
      .end(function (err, res) {
        // Error supertest
        if (err) {
          done(err)
        }
        // Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Validation error: Please enter a valid email')
        done()
      })
    
  })

  it('should response StatCode (400) - Bad Request (password)', function (done) {
    // Setup
    const input = {
      email: 'test@mail.com',
      password: 'qwert'
    }
    // Execute
    request(app)
      .post('/register')
      .send(input)
      .end(function (err, res) {
        // Error supertest
        if (err) {
          done(err)
        }
        // Assert
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Validation error: Password must be at least 6 characters')
        done()
      })
    
  })

  it('should response StatCode (500) - Internal server error', function (done) {
    // Setup
    const input = {
      emailas: '',
      passwordas: ''
    }
    // Execute
    request(app)
      .post('/register')
      .send(input)
      .end(function (err, res) {
        // Error supertest
        if (err) {
          done(err)
        }
        // Assert
        expect(res.statusCode).toEqual(500)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Internal server error')
        done()
      })
    
  })
})