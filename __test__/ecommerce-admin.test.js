const { User } = require('../models')
const request = require('supertest')
const {hashPassword, comparePassword} = require('../helper/bcrypt')

const app = require('../app')

let token = ''
let admin
//login
describe ('POST /login', function() {

      beforeAll(function(done){
            User.findOne({where: {id: 1}})
                 .then(user => {
                       admin = {
                             id: user.id,
                             email: user.email,
                             password: 'qweqwe',
                             role: user.role
                       }
                       done()
                 }).catch(err => {
                       done(err)
                 })
      })

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
       email: admin.email,
       password: admin.password
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
      it("should send response with status code 401", function(done){
            const body = {
                  email: "admindsd",
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
