const request = require ("supertest")
const app = require ("../app")
const { User } = require("../models")
const models = require ("../models")


let userLogin = {
    email: "agung@mail.com",
    password: "123456"
}

function clearUser () {
    if (process.env.NODE_ENV === "test") {
        return User.destroy({ where: {} })
    }
}

beforeAll ((done) => {
    const dataAdmin = {
        username: "agung",
        email: "agung@mail.com",
        password: "123456"
    }
    console.log(dataAdmin)
    User.create (dataAdmin)
        .then(result => {
            done()

        })
        .catch(err => {
            console.log(err)
        })
        
})

afterAll ((done) => {
    clearUser()
        .then(() => {
            models.sequelize.close()
            done()
        })
        .catch(console.log)
})

describe ("POST /login", function () {
    describe ("Success Login", function () {
        it ("Should Send Response with 201 Code", function (done) {
            //setup
            const body = userLogin
            //execute
            request(app)
                .post("/login")
                .send(body)
                .end(function (err, res) {
                    if (err) done(err)
                    console.log(res.body)
                    //assert
                    expect(res.statusCode).toBe(201)
                    expect(res.body).toHaveProperty("access_token")
                    expect(typeof res.body).toBe("object")
                    expect(typeof res.body.access_token).toBe("string")

                    done()
                })
        })
    })
    
    describe ("Failed Login", function () {
        it ("Should Send Response with 400 Code", function (done) {
            //setup
            const body = {
                email: "",
                password: ""
            }
            //execute
            request(app)
                .post("/login")
                .send(body)
                .end (function (err, res) {
                    if (err) done(err)
                    
                    //assert
                    expect(res.statusCode).toBe(400)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["Incorrect Email / Password"])
                    )

                    done()
                })
        })

        it ("should Send Response with 400 Code", function (done) {
            //setup
            const body = {
                email: "agung@mail.com",
                password: "654321"
            }
            //execute
            request(app)
                .post("/login")
                .send(body)
                .end(function (err, res) {
                    if (err) done (err)

                    //assert
                    expect(res.statusCode).toBe(400)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["Incorrect Email / Password"])
                    )

                    done()
                })
        })

        it ("Should Send Response with 400 Code", function (done) {
            //setup
            const body = {}
            //execute
            request(app)
                .post("/login")
                .send(body)
                .end(function (err, res) {
                    if (err) done (err)

                    //assert
                    expect(res.statusCode).toBe(500)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["Internal Server Error"])
                    )

                    done()
                })
        })
    })
})


describe ("POST /register", function () {
    describe("Success Register", function () {
        it ("Should Send Response with 201 Code", function (done) {
            //setup
            const body = {
                username: "agung",
                email: "agung@mail.com",
                password: "123456"
            }
            //execute
            request(app)
                .post("/register")
                .send(body)
                .end(function (err, res) {
                    if (err) done (err)

                    //assert
                    expect(res.statusCode).toBe(201)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("username")
                    expect(typeof res.body.username).toBe("string")
                    expect(res.body).toHaveProperty("email")
                    expect(typeof res.body.email).toBe("string")
                    expect(res.body).toHaveProperty("id")
                    expect(typeof res.body.id).toBe("number")

                    done()
                })
        })
    })

    describe ("Failed Register", function () {
        it ("Should Send Response with 400 Code", function (done) {
            //setup
            const body = {
                username: "",
                email: "",
                password: "",
            }
            //execute
            request(app)
                .post("/register")
                .send(body)
                .end(function(err, res) {
                    if (err) done (err)

                    //assert
                    expect(res.statusCode).toBe(400)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["Username Should Not Be Empty", "Email Should Not Be Empty", "Password Should Not Be Empty",])
                    )

                    done()
                })
        })
        it ("Should Send Response with 400 Code", function (done) {
            //setup
            const body = {}
            //execute
            request(app)
                .post("/register")
                .send(body)
                .end(function(err, res) {
                    if (err) done(err)

                    //assert
                    expect(res.statusCode).toBe(400)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["Username Should Not Be Null", "Email Should Not Be Null", "Password Should Not Be Null"])
                    )

                    done ()
                })
        })
        it ("Should Send Response with 400 Code", function (done) {
            //setup
            const body = {
                username: "AMR",
                email: "agung@mail.com",
                password: "1234"
            }
            //execute
            request(app)
                .post("/register")
                .send(body)
                .end(function(err, res) {
                    if (err) done (err)

                    //assert
                    expect(res.statusCode).toBe(400)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["Minimum Length of Password is 6"])
                    )

                    done()
                })
        })
    })
})

