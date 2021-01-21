const request = require('supertest')
const app = require('../app')
const { User } = require('../models/index')
const models = require('../models')
const clearUser = require('./helper/clearUser')


describe('Login', () => {
    afterAll(async function (done) {
        await clearUser() 
        .then(function () {
            models.sequelize.close();
            done();
        })
        .catch(console.log)
    })

    describe(".post/login", function () {
        it("is has a correct email and password and that should be responded by status code of 200", (done) => {
            //setup
            const body = {
                email: 'admin@mail.com',
                password: '1234'
            }   
            //execute
            request(app)
                .post("/login")
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(200)
                    expect(res.body).toHaveProperty("access_token")
                    expect(typeof res.body).toEqual("object")
                    done()
                })
        })
    
        it("has a wrong password but correct email and that should be responded by status code of 401", (done) => {
            //setup
            const body = {
                email: 'admin@mail.com',
                password: 'thisIsAWrongPassword'
            }   
            //execute
            request(app)
                .post("/login")
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["invalid email / password"]),
                );
                    done()
                })
        })
    
        it("has no email and that should be responded by status code of 401", (done) => {
            //setup
            const body = {
                email: '',
                password: '1234'
            }   
            //execute
            request(app)
                .post("/login")
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["invalid email / password"]),
                );
                    done()
                })
        })
    })

})

