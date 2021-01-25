const req = require('supertest')
const app = require('../app')
const {cleanUser} = require('./helper/cleanDb')
const {seederUser} = require('./helper/seeder')
const {User} = require('../models/index')
const {generateToken} = require('../helper/jwt')

let accesstoken = ''
    
afterAll((done)=>{
    cleanUser()
    .then(()=>{
        done()
    })
    .catch(err=>{
        console.log(err);
    })
})
beforeAll((done)=>{
    seederUser()
    .then(()=>{
        return User.findOne()
    })
    .then((data) => {
        let user = {
            id:data.id,
            email:data.email,
            role:data.role
        }
        accesstoken = generateToken(user)
        done()
    })
    .catch(err=>{
        console.log(err);
    })
})
describe('POST /register',function(){
    //valid
    it('valid register should send response 201 status code', function(done){
        //setup
        const body = {
            firstname:'some',
            lastname:'one',
            email: 'b@gmail.com',
            password: '123456',
            role: 'admin'
        };
        //execute
        req(app)
        .post('/register')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(201)
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('email')
            expect(res.body).toHaveProperty('firstname')
            expect(res.body).toHaveProperty('lastname')
            expect(res.body).toHaveProperty('role')
            expect(typeof res.body.id).toEqual('number')
            expect(typeof res.body.firstname).toEqual('string')
            expect(typeof res.body.lastname).toEqual('string')
            expect(typeof res.body.email).toEqual('string')
            expect(typeof res.body.role).toEqual('string')
            done()
        })
    })

    //firstname empty
    it('firstname empty should send response 400 status code', function(done){
        //setup
        const body = {
            firstname:'',
            lastname:'one',
            email: 'b@gmail.com',
            password: '123456',
            role: 'admin'
        };
        //execute
        req(app)
        .post('/register')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation notEmpty on firstname failed'])
            )
            done()
        })
    })

    //lastname empty
    it('lastname empty should send response 400 status code', function(done){
        //setup
        const body = {
            firstname:'some',
            lastname:'',
            email: 'b@gmail.com',
            password: '123456',
            role: 'admin'
        };
        //execute
        req(app)
        .post('/register')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation notEmpty on lastname failed'])
            )
            done()
        })
    })

    //email empty
    it('email empty should send response 400 status code', function(done){
        //setup
        const body = {
            firstname:'some',
            lastname:'one',
            email: '',
            password: '123456',
            role: 'admin'
        };
        //execute
        req(app)
        .post('/register')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation notEmpty on email failed'])
            )
            done()
        })
    })

    //password empty
    it('password empty should send response 400 status code', function(done){
        //setup
        const body = {
            firstname:'some',
            lastname:'one',
            email: 'b@gmail.com',
            password: '',
            role: 'admin'
        };
        //execute
        req(app)
        .post('/register')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation notEmpty on password failed'])
            )
            done()
        })
    })

    //role empty
    it('role empty should send response 400 status code', function(done){
        //setup
        const body = {
            firstname:'some',
            lastname:'one',
            email: 'b@gmail.com',
            password: '123456',
            role: ''
        };
        //execute
        req(app)
        .post('/register')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation notEmpty on role failed'])
            )
            done()
        })
    })

    //invalid email format
    it('invalid email format should send response 400 status code', function(done){
        //setup
        const body = {
            firstname:'some',
            lastname:'one',
            email: 'abcd',
            password: '123456'
        };
        //execute
        req(app)
        .post('/register')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation isEmail on email failed'])
            )
            done()
        })
    })

    //all empty
    it('empty value should send response 400 status code', function(done){
        //setup
        const body = {
            firstname:'',
            lastname:'',
            email: '',
            password: '',
            role: ''
        };
        //execute
        req(app)
        .post('/register')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation notEmpty on firstname failed']),
                expect.arrayContaining(['Validation notEmpty on lastname failed']),
                expect.arrayContaining(['Validation notEmpty on email failed']),
                expect.arrayContaining(['Validation notEmpty on password failed']),
                expect.arrayContaining(['Validation notEmpty on role failed'])
            )
            done()
        })
    })
})
    
//===================================================================================

//valid
describe('POST /login',function(){
    it('valid login should send response 200 status code', function(done){
        //setup
        const body = {
            email: 'a@gmail.com',
            password: '123456'
        }
        //execute
        req(app)
        .post('/login')
        .send(body)
        .end(function(err,res){
            if (err) done(err)
            
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('payload')
            expect(res.body.payload).toHaveProperty('accesstoken')
            expect(res.body.payload).toHaveProperty('role')
            expect(typeof res.body.payload.accesstoken).toEqual('string')
            expect(typeof res.body.payload.role).toEqual('string')
            done()
        })
    })

    //invalid password
    it('invalid password should send response 404 status code', function(done){
        //setup
        const body = {
            email: 'a@gmail.com',
            password: 'qwerty'
        }
        //execute
        req(app)
        .post('/login')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')
            expect(res.body.message).toEqual('Invalid email or password')
            done()
        })
    })

    //invalid email
    it('invalid email should send response 404 status code', function(done){
        //setup
        const body = {
            email: 'z@gmail.com',
            password: '123456'
        }
        //execute
        req(app)
        .post('/login')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')
            expect(res.body.message).toEqual('Invalid email or password')
            done()
        })
    })

    //empty email
    it('empty email should send response 400 status code', function(done){
        //setup
        const body = {
            email: '',
            password: '123456'
        }
        //execute
        req(app)
        .post('/login')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')
            expect(res.body.message).toEqual('Email is required')
            done()
        })
    })

    //empty password
    it('empty password should send response 400 status code', function(done){
        //setup
        const body = {
            email: 'a@gmail.com',
            password: ''
        }
        //execute
        req(app)
        .post('/login')
        .send(body)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')
            expect(res.body.message).toEqual('Password is required')
            done()
        })
    })
})

describe('POST /checktoken',function(){
    //checktoken
    it('valid checktoken should send response 201 status code', function(done){
        //setup
        //execute
        req(app)
        .post(`/checktoken`)
        .send()
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('string')
            expect(res.body).toEqual('admin')
            done()
        })
    })
})