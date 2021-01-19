const request = require('supertest')

const app = require('../app')


describe('POST /login',function() {

        // ======================== successfull login ==========================
        it('should status 200, successfull login' ,function (done) { //ok
            //setup
            const body = {
                email : 'admin@mail.com',
                password : '123456',         
            }
        
            //excecute
            request(app) 
            .post('/login')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperties('access_token')
                expect(res.body).toEqual({
                    access_token : expect.any(String)
                })


                done()
            })
        })

        // ==========================  error in password  ===============================
        it('should status 400, invalid for password / not found in database' ,function (done) {
            //setup
            const body = {
                email : 'admin@mail.com',
                password : '12345678910',         
            }
        
            //excecute
            request(app) 
            .post('/login')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                        
                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperties('message')
                expect(res.body.message).toEqual('Invalid email / password')
                done()
            })
        })


        // ====================== email tidak ada di db ===========================
        it('should status 400, invalid for email / not found in database' ,function (done) {
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
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperties('message')
                expect(res.body.message).toEqual('Invalid email / password')

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
                expect(res.body).toHaveProperties('message')
                expect(res.body.message).toEqual('Email / Password must be filled')

                done()
            })
        })

})