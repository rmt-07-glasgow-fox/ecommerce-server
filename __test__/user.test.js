const request = require('supertest')
const app = require('../app')
const models = require('../models')
const clearUser = require('./helpers/clear-users')

/*Planned POST /register tests
1. wrong email format
2. wrong password format or conditions
3. email is already registered
4. user is created
*/

//For register

describe('User register and login', function(){
    afterAll(function(done) {
       clearUser()
        .then(function() {
            done()
        })
        .catch()
    })
    describe('POST /register (SUCCESS)',  function(){
        it('should send response with 201 status code and return an object with id and email', function(done){
            //setup
            const body = {
                email: 'example@mail.com',
                password : 'password'
            }
            //execute
            request(app)
                .post('/register')
                .send(body)
                .end(function(err, res){
                    if (err) done(err)
                    //Assert
                    expect(res.statusCode).toEqual(201)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('id')
                    expect(typeof res.body.id).toEqual('number')
                    done()
                })
        })
    })
    
    //cannot have the same existed email
    describe('POST /register (FAIL) because of existing email', function(){
        it('should send response with 400 status code', function(done){
            //setup
            const body = {
                email : 'example@mail.com',
                password : 'password'
            }
            //execute
            request(app)
            .post('/register')
            .send(body)
            .end(function(err, res){
                if(err) done(err)
                //Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Email already registered'])
                )
                done()
            })
        })
    })
    
    //cannot have empty email and password
    describe('POST /register (FAIL) because of empty email and password', function(){
        it('should send response with 400 status code', function(done){
            //setup
            const body = {
                email : '',
                password : ''
            }
            //execute
            request(app)
            .post('/register')
            .send(body)
            .end(function(err, res){
                if(err) done(err)
                //Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Email is required'],['Password minimal of 6 characters'])
                )
                done()
            })
        })
    })
    
    //login
    //correct login format matched with email and password from database
    describe('POST /login (SUCCESS) ', function(){
        it('should send response with 200 status code', function(done){
            const body = {
                email: 'example@mail.com',
                password : 'password'
            }
            request(app)
            .post('/login')
            .send(body)
            .end(function(err, res){
                if(err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(res.body).toHaveProperty('access_token')
                done()
            })
        })
    })
    
    //login but with incorrect email and/or password
    describe('POST /login (FAIL) because of incorrect email and/or password', function(){
        it('should send response with 200 status code', function(done){
            const body = {
                email: 'a@mail.com',
                password : 'password'
            }
            request(app)
            .post('/login')
            .send(body)
            .end(function(err, res){
                if(err) done(err)
                expect(res.statusCode).toEqual(401)
                expect(res.body.message).toEqual("Incorrect Email / Password")
                done()
            })
        })
    })
})


