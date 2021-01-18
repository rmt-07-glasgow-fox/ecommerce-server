const request = require('supertest')

const app = require('../app')


describe('POST /login',function() {

    describe('good params (SUCCESS)', function () {

        // ======================== successfull login ==========================
        it('should status 200, successfull login' ,function (done) {
            //setup
            const body = {
                email : 'admin@mail.com',
                password : '123456',         
            }
        
            //excecute
            request(app) 
            .post('/login')
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperties('access_token')
                done()
            })
        })
    })

    describe('bad params (FAIL)', function() {

        // ==========================  error in password  ===============================
        it('should status 400, invalid email and pass' ,function (done) {
            //setup
            const body = {
                email : 'admin@mail.com',
                password : '12345678910',         
            }
        
            //excecute
            request(app) 
            .post('/login')
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperties('errors')
                xpect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['email / password not valid'])
                )
                done()
            })
        })


        // ====================== email tidak ada di db ===========================
        it('should status 400, invalid email and pass' ,function (done) {
            //setup
            const body = {
                email : 'administrator@mail.com',
                password : '123456',         
            }
        
            //excecute
            request(app) 
            .post('/login')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperties('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['email / password not valid'])
                )
                done()
            })
        })


        // ====================== email, pass not fill ===========================
        it('should status 400, email and pass must be filled' ,function (done) {
            //setup
            const body = {
                email : '',
                password : '',         
            }
        
            //excecute
            request(app) 
            .post('/login')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperties('errors')
                xpect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['email / password not valid'])
                )
                done()
            })
        })
    })
})