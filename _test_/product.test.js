const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { generateToken } = require("../helpers/jwt")
let access_token;
let access_token2;


beforeAll(done => {
    access_token = generateToken({email: "tommysusanto77@gmail.com", id: 2})
    access_token2 = generateToken({email: "tonnysusanto77@gmail.com", id: 3})
    done()
})

afterAll(done => {
    queryInterface.bulkDelete("Products")
    .then(data => {
        done()
    })
    .catch(error => {
        done(error)
    })
})


//----------create success------------
describe("Create Product POST /product", () => {
    describe("Success Create Product", () => {
        test("create Product with accept body value", done => {
            request(app)
            .post("/product")
            .set('access_token', access_token)
            .send({
                name: "sepatu" ,
                imageUrl: "gambar" ,
                price: 200000,
                stock: 50,
                category: 'fashion'
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("name", "sepatu")             
                expect(body).toHaveProperty("price", 200000)
                expect(body).toHaveProperty("stock", 50)
                expect(body).toHaveProperty("imageUrl", "gambar")
                expect(body).toHaveProperty("category", "fashion")
                done()
            })
        })  
    })
})


//----------create error no token------------

describe("error when Create Product", () => {
    test("error when there is no token", done => {
        request(app)
        .post("/product")
        .send({
            name: "sepatu" ,
            imageUrl: "gambar" ,
            price: 200000,
            stock: 50,
            category: 'fashion'
        })
        .end((err,res) => {
            const { body,status } = res
            if(err){
                return done(err)
            }
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "please login first")             
            done()
        })
    })  
})

//----------create error user status is not admin------------

describe("error when Create Product", () => {
    describe("Error Create Product", () => {
        test("error when user is not an admin", done => {
            request(app)
            .post("/product")
            .set('access_token', access_token2)
            .send({
                name: "sepatu" ,
                imageUrl: "gambar" ,
                price: 200000,
                stock: 50,
                category: 'fashion'
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "you aren't an admin")             
                done()
            })
        })  
    }) 
})

//----------create error when required field not filled------------

describe("error when Create Product", () => {
    test("error when user is not fill required field", done => {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({
            name:  "",
            imageUrl: "" ,
            price: 0,
            stock: 0,
            category: 'fashion'
        })
        .end((err,res) => {
            const expected = ["product name cannot be empty","image url cannot be empty"];
            const { body,status } = res
            if(err){
                return done(err)
            }
            expect(status).toBe(400)
            expect(body.message).toEqual(expect.arrayContaining(expected))            
            done()
        })
    }) 
})


//----------create error when required field filled with another type of required data------------

describe("error when Create Product", () => {
    test("error when user is fill field with another type of required data", done => {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({
            name:  "baju",
            imageUrl: "baju" ,
            price: "baju",
            stock: "baju",
            category: 'fashion'
        })
        .end((err,res) => {
            const { body,status } = res
            if(err){
                return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", ["price must be fill with number","stock must be fill with number"])             
            done()
        })
    }) 
})


//----------create error when stock and price filled less than 0------------

describe("error when Create Product", () => {
    test("error when user is fill stock and price filled less than 0", done => {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({
            name:  "baju",
            imageUrl: "baju" ,
            price: -1,
            stock: -1,
            category: 'fashion'
        })
        .end((err,res) => {
            const { body,status } = res
            if(err){
                return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", ["minimal price is 0","minimal stock is 0"])             
            done()
        })
    }) 
})


//----------update success------------
describe("update Product PUT /product/:id", () => {
    describe("Success update Product", () => {
        test("update Product with accept body value", done => {
            request(app)
            .put("/product/26")
            .set('access_token', access_token)
            .send({
                name: "baju" ,
                imageUrl: "sendal" ,
                price: 300000,
                stock: 50,
                category: 'fashion'
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty("name", "baju")             
                expect(body).toHaveProperty("price", 300000)
                expect(body).toHaveProperty("stock", 50)
                expect(body).toHaveProperty("imageUrl", "sendal")
                expect(body).toHaveProperty("category", "fashion")
                done()
            })
        })  
    })
})


//----------update error no token------------
describe("update error no token Product PUT /product/:id", () => {
    describe("update error", () => {
        test("update error no token", done => {
            request(app)
            .put("/product/26")
            .send({
                name: "baju" ,
                imageUrl: "sendal" ,
                price: 300000,
                stock: 50,
                category: 'fashion'
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "please login first")             
                done()
            })
        })  
    })
})


//----------update error user not an admin------------
describe("update error user not an admin PUT /product/:id", () => {
    describe("update error", () => {
        test("update error user not an admin", done => {
            request(app)
            .put("/product/26")
            .set('access_token', access_token2)
            .send({
                name: "baju" ,
                imageUrl: "sendal" ,
                price: 300000,
                stock: 50,
                category: 'fashion'
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "you aren't an admin")   
                done()
            })
        })  
    })
})


//----------update error when required field not filled------------
describe("update error when required field not filled PUT /product/:id", () => {
    describe("update error", () => {
        test("update error when required field not filled", done => {
            request(app)
            .put("/product/26")
            .set('access_token', access_token)
            .send({
                name: "" ,
                imageUrl: "" ,
                price: 300000,
                stock: 50,
                category: 'fashion'
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", ["product name cannot be empty","image url cannot be empty"])  
                done()
            })
        })  
    })
})


//----------update error when required field filled with another type of required data------------
describe("update error when required field filled with another type of required data PUT /product/:id", () => {
    describe("update error", () => {
        test("update error when required field filled with another type of required data", done => {
            request(app)
            .put("/product/26")
            .set('access_token', access_token)
            .send({
                name: "baju" ,
                imageUrl: "sandal" ,
                price: "baju",
                stock: "baju",
                category: 'fashion'
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", ["price must be fill with number","stock must be fill with number"])  
                done()
            })
        })  
    })
})


//----------update error when stock and price filled less than 0------------
describe("update error when stock and price filled less than 0 PUT /product/:id", () => {
    describe("update error", () => {
        test("update error when stock and price filled less than 0", done => {
            request(app)
            .put("/product/26")
            .set('access_token', access_token)
            .send({
                name: "baju" ,
                imageUrl: "sandal" ,
                price: -1,
                stock: -1,
                category: 'fashion'
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", ["minimal price is 0","minimal stock is 0"]) 
                done()
            })
        })  
    })
})

//----------delete success------------
describe("delete Product DELETE /product/:id", () => {
    describe("Success delete Product", () => {
        test("delete Product with accept body value", done => {
            request(app)
            .delete("/product/1")
            .set('access_token', access_token)
            .end((err,res) => {
                console.log(err)
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("message", "Product deleted")          
                done()   
            })
        })  
    })
})

//----------delete failed no access token------------
describe("delete failed no access token DELETE /product/:id", () => {
    describe("delete failed", () => {
        test("delete failed no access token", done => {
            request(app)
            .delete("/product/26")
            .end((err,res) => {
                console.log(err)
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "please login first")          
                done()   
            })
        })  
    })
})

//----------delete failed user ar not an admin------------
describe("delete failed user ar not an admin DELETE /product/:id", () => {
    describe("delete failed", () => {
        test("delete failed user ar not an admin", done => {
            request(app)
            .delete("/product/50")
            .set('access_token', access_token2)
            .end((err,res) => {
                console.log(err)
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "you aren't an admin")          
                done()   
            })
        })  
    })
})