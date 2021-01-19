const req = require('supertest')
const app = require('../app')
const cleanUser = require('./helper/cleanUser')
const seeder = require('./helper/seeder')

describe('POST /register',function(){
    afterAll((done)=>{
        cleanUser()
        .then(()=>{
            done()
        })
        .catch(err=>{
            console.log(err);
        })
    })

    //valid
    it('valid register should send response 201 status code', function(done){
        //setup
        const body = {
            firstname:'some',
            lastname:'one',
            email: 'a@gmail.com',
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

    //empty text
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

    //empty text
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
})

//===================================================================================

//valid
describe('POST /login',function(){
    beforeAll((done)=>{
        seeder()
        .then(()=>{
            done()
        })
        .catch(err=>{
            console.log(err);
        })
    })

    afterAll((done)=>{
        cleanUser()
        .then(()=>{
            done()
        })
        .catch(err=>{
            console.log(err);
        })
    })

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
            expect(res.body).toHaveProperty('accesstoken')
            expect(typeof res.body.accesstoken).toEqual('string')
            done()
        })
    })

    //invalid email or password
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

    //empty email or password
    it('empty email should send response 404 status code', function(done){
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

    it('empty password should send response 404 status code', function(done){
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