const request = require ("supertest")
const app = require("../app")
const { Product } = require("../models")
const models = require("../models")


let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZ3VuZyIsImVtYWlsIjoiYWd1bmdAbWFpbC5jb20iLCJpYXQiOjE2MTEwNjQzMTd9.OTfQFv3VoDC_q1HRbiUP7nip7hX587OuN9bHNVTfVyQ"

function clearUser () {
    if (process.env.NODE_ENV === "test") {
        return Product.destroy({ where: {} })
    }
}

afterAll ((done) => {
    clearUser()
        .then(() => {
           models.sequelize.close()
           done() 
        })
        .catch(console.log)
})

describe("GET /products", function() {
    describe("Success Access Data", function () {
        it ("Should Response with 200 Code", function (done) {
            //setup
            const headers = {
                access_token
            }
            //execute
            request(app)
                .get("/products")
                .send(headers)
                .end(function(err, res) {
                    if (err) done (err)

                    //assert
                    expect(res.statusCode).toBe(200)
                    // expect(res.body).toBe("object")
                    done()
                })
        })
    })
})


describe ("POST /products", function () {
    describe.only ("Success Create New Products", function () {
        it ("Should Send Response with 201 Code", function (done) {
            //setup
            const body = {
                name: "Nampan",
                image_url: "https://google.com",
                price: 10000,
                stock: 10,
                status: true
            }
            //headers
            const headers = access_token
            //execute
            request(app)
                .post("/products")
                .send(body, headers)
                .end(function(err, res) {
                    if (err) done (err)

                    //assert
                    expect(res.statusCode).toBe(201)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("id")
                    expect(typeof res.body).toBe("number")
                    expect(res.body).toHaveProperty("name")
                    expect(res.body.name).toEqual(body.name)
                    expect(res.body).toHaveProperty("image_url")
                    expect(res.body.image_url).toEqual(body.image_url)
                    expect(res.body).toHaveProperty("price")
                    expect(res.body.price).toEqual(body.price)
                    expect(res.body).toHaveProperty("stock")
                    expect(res.body.stock).toBe(body.stock)
                    expect(res.body).toHaveProperty("status")
                    expect(res.body.status).toEqual(body.status)
                    expect(res.body).toHaveProperty("UserId")
                    expect(typeof res.body.UserId).toBe("number")

                    done()
                })
        })
    })

    describe("Failed Create New Products", function () {
        it ("Should Send Response with 400 Code", function (done) {
            //setup
            const body = {
                name: "Nampan",
                image_url: "https://google.com",
                price: "10000",
                stock: "10"
            }
            //execute
            request(app)
                .post("/products")
                .send(body)
                .end(function(err, res) {
                    if (err) done (err)

                    //assert
                    expect(res.statusCode).toBe(400)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["Data Type of Price Must Be Integer", "Data Type of Stock Must Be Integer"])
                    )

                    done()
                })
        })

        it ("Should Send Response with 400 Code", function (done) {
            //setup
            const body = {
                name: "Nampan",
                image_url: "https://google.com",
                price: -10000,
                stock: -10
            }
            //execute
            request(app)
                .post("/products")
                .send(body)
                .end(function(err, res) {
                    if (err) done (err)

                    //assert
                    expect(res.statusCode).toBe(400)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["Minimum Price is 1000", "Minimum Stock is 1"])
                    )

                    done ()
                })
        })
        
        it ("Should Send Response with 400 Code", function (done) {
            //setup
            const body = {
                name: "",
                image_url: "",
                price: 0,
                stock: 0
            }
            //execute
            request(app)
                .post("/products")
                .send(body)
                .end(function(err, res) {
                    if (err) done (err)

                    //assert
                    expect(res.statusCode).toBe(400)
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("errors")
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining([
                            "Name Should Not Be Empty",
                            "Link Image Should Not Be Empty",
                            "Minimum Price is 1000",
                            "Minimum Stock is 1"
                        ])
                    )

                    done()
                })
        })
    })
})