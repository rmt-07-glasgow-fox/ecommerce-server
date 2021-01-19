const request = require('supertest')
const models = require('../models')
const app = require('../app')

afterAll(done => {
    models.sequelize.close()
    done()
})

describe('POST/Login is Success', () => {
    it('Login Success, return 200', (done) => {
        const body = {
            email: 'admin@mail.com',
            password: 'todokete',
        }
        request(app)
            .post('/login')
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('access_token')
                expect(typeof res.body.access_token).toEqual('string')

                done()
            })
    })
})

describe('POST/Login is Failed', () => {
    it('Login failed with invalid password, return 401', (done) => {
        const body = {
            email: 'admin@mail.com',
            password: 'happypartytrain',
        }
        request(app)
            .post('/login')
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(401);
                expect(res.body).toHaveProperty('message')
                expect(typeof res.body.message).toEqual('string')

                done()
            })
    })
    it('Login failed with invalid email, return 401', (done) => {
        const body = {
            email: 'pana@mail.com',
            password: 'todokete',
        }
        request(app)
            .post('/login')
            .send(body)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(401);
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(typeof res.body.message).toEqual('string')

                done()
            })
    })

    it('Login failed with invalid email, return 401', (done) => {
      const body = {
          email: 'pana@mail.com',
          password: 'todokete',
      }
      request(app)
          .post('/login')
          .send(body)
          .end(function(err, res) {
              //error supertest
              if (err) done(err)

              //Assert
              expect(res.statusCode).toEqual(401);
              expect(typeof res.body).toEqual('object')
              expect(res.body).toHaveProperty('message')
              expect(typeof res.body.message).toEqual('string')

              done()
          })
    })

    it('Login failed with null, return 401', (done) => {
      const body = {
          email: '',
          password: '',
      }
      request(app)
          .post('/login')
          .send(body)
          .end(function(err, res) {
              //error supertest
              if (err) done(err)

              //Assert
              expect(res.statusCode).toEqual(401);
              expect(typeof res.body).toEqual('object')
              expect(res.body).toHaveProperty('message')
              expect(typeof res.body.message).toEqual('string')

              done()
          })
    })
})