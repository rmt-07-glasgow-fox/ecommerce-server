const request = require('supertest')
const app = require('../app')


describe('POST /login', function (){
    it('should response 200 status code', function(done){
        let body = {
            email: 'admin@mail.com',
            password: '123456'
        }
        request(app)
         .post('/login')
         .send(body)
         .end(function(err, res){
             if(err) done(err)

             expect(res.statusCode).toEqual(200)
             expect(typeof res.body).toEqual('object')
             expect(res.body).toHaveProperty('access_token')
             expect(typeof res.body.access_token).toEqual('string')
             done()
         })
    })

    it('should response 400 status code', function(done){
        let body = {
            email: '',
            password: ''
        }
        request(app)
         .post('/login')
         .send(body)
         .end(function(err, res){
             if(err) done(err)

             expect(res.statusCode).toEqual(400)
             expect(typeof res.body).toEqual('object')
             expect(res.body).toHaveProperty('errors')
             expect(res.body.errors).toEqual(
                 expect.arrayContaining(['Email is required', 'Password is required'])
             )
             done()
         })
    })

    it('should response 400 status code', function(done){
        let body = {
            email: 'admin@mail.com',
            password: '1234567'
        }
        request(app)
         .post('/login')
         .send(body)
         .end(function(err, res){
             if(err) done(err)

             expect(res.statusCode).toEqual(400)
             expect(typeof res.body).toEqual('object')
             expect(res.body).toHaveProperty('errors')
             expect(res.body.errors).toEqual(
                 expect.arrayContaining(['email/password is wrong'])
             )
             done()
         })
    })

    it('should response 400 status code', function(done){
        let body = {
            email: 'admin2@mail.com',
            password: '123456'
        }
        request(app)
         .post('/login')
         .send(body)
         .end(function(err, res){
             if(err) done(err)

             expect(res.statusCode).toEqual(400)
             expect(typeof res.body).toEqual('object')
             expect(res.body).toHaveProperty('errors')
             expect(res.body.errors).toEqual(
                 expect.arrayContaining(['email/password is wrong'])
             )
             done()
         })
    })
})