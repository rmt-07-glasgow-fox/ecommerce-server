const { User } = require('../models')
const request = require('supertest')

const app = require('../app')

let token = ''

//login
describe ('POST /login', function() {

      afterAll(function(done){
            User.findAll()
                .then(user => {
                      user.forEach(el => {
                            if(el.id !== 1){
                                  User.destroy({where: {}})
                            }
                      })
                      done()
                }).then(() => {
                      done()
                }).catch(err => {
                      console.log(err);
                      done()
                })
      })

      it("should send response with 200 status code", function(done) {

      const body = {
       email: "admin@mail.com",
       password: "qweqwe"
      }

      request(app)
            .post('/login')
            .send(body)
            .end(function(err, res){
                  if(err) done(err)

            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('access_token')
            expect(typeof res.body.access_token).toEqual('string')
  
 
            done()
            })

      })

      it("should send response with status code 401", function(done){
            const body = {
                  email: "admina@mail.com",
                  password: "qweqwe",
 
            }  

            request(app)
            .post('/login')
            .send(body)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(401)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('message')
                  expect(res.body.message).toEqual("invalid email/password")

            done()
            })
      })

      it("should send response with status code 401", function(done){
            const body = {
                  email: "admin@mail.com",
                  password: "qeeweew",
            }  

            request(app)
            .post('/login')
            .send(body)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(401)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('message')
                  expect(res.body.message).toEqual("invalid email/password")
            done()
            })
      })
      
})
