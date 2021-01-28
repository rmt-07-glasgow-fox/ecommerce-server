const request = require("supertest")
const app = require("../app")


// ---------login success-----------

describe("Login User POST /login", () => {
    describe("Success Login", () => {
        test("Success Login", done => {
            request(app)
            .post("/login")
            .send({
                email: "tommysusanto77@gmail.com",
                password: "123456"
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token")
                done()
            })
        })  
    })
})


// ---------login failed wrong password-----------

describe("Login User POST /login", () => {
    describe("login failed", () => {
        test("login failed wrong password", done => {
            request(app)
            .post("/login")
            .send({
                email: "tommysusanto77@gmail.com",
                password: "salah"
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "wrong email/password")
                done()
            })
        })  
    })
})


// ---------login failed email not registered on database-----------

describe("Login User POST /login", () => {
    describe("login failed", () => {
        test("login failed email not registered on database", done => {
            request(app)
            .post("/login")
            .send({
                email: "ujang@gmail.com",
                password: "salah"
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "email hasn't been registered")
                done()
            })
        })  
    })
})



// ---------login failed not fill email and password form-----------

describe("Login User POST /login", () => {
    describe("login failed", () => {
        test("login failed not fill email and password form", done => {
            request(app)
            .post("/login")
            .send({
                user: "",
                password: ""
            })
            .end((err,res) => {
                const expected = ["email cannot be empty","password cannot be empty"];
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.arrayContaining(expected))
                done()
            })
        })  
    })
})


