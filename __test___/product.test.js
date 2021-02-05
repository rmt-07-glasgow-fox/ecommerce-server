const request = require('supertest')
const app = require('../app')
const models = require('../models')

const clearUser = require('./helper/clearUser')
const clearProduct = require('./helper/clearProduct')


let token = {
    admin: '',
    customer: ''
}

let productId = 0

describe('Product', () => {
    beforeAll(async(done) => {
        let user = {
            admin : {
                email: "admin@mail.com",
                password: '1234'
            },
            customer : {
                email: "customer@mail.com",
                password: '1234'
            }
        }
    
        const admin = await request(app)
            .post('/login')
            .send(user.admin)
    
        token.admin = admin.body.access_token;
    
        const customer = await request(app)
            .post('/login')
            .send(user.customer)
    
        token.customer = customer.body.access_token;
        done();
    })

    afterAll(function  (done) {
         clearUser() 
        .then(function () {
            return clearProduct()
        })
        .then(function () {
             models.sequelize.close();
            done();
        })
        .catch(console.log)
    })

    describe(".post/products", function () {
        it("is has a correct format and that should be responded by status code of 201", (done) => {
            //setup
            const body = {
                name:"boeing",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "10000",
                stock: "1",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .post("/products")
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    productId = res.body.id
                    expect(res.statusCode).toEqual(201)
                    expect(typeof res.body).toEqual("object")
                    done()
                })
        })

        it("is has a incorrect token and that should be responded by status code of 401", (done) => {
            //setup
            const body = {
                name:"boeing",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "10000",
                stock: "1",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .post("/products")
                .set("access_token", token.customer)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    // console.log(res);
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["unauthorize"]),
                );
                    done()
                })
        })

        it("is has a incorrect format and that should be responded by status code of 400", (done) => {
            //setup
            const body = {
                name:"",
                image_url: "",
                price: "",
                stock: "",
                description: "",
                categoryId: "1",
            }   
            //execute
            request(app)
                .post("/products")
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["please fill the product name"]),
                        expect.arrayContaining(["please fill the product image_url"]),
                        expect.arrayContaining(["please fill the product price"]),
                        expect.arrayContaining(["please fill the product stock"]),
                        expect.arrayContaining(["please fill the product description"]),
                        expect.arrayContaining(["please fill the product categoryId"])
                );
                    done()
                })
        })

        it("is has a incorrect format for price and that should be responded by status code of 400", (done) => {
            //setup
            const body = {
                name:"boeing",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "-10000",
                stock: "1",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .post("/products")
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["price can't be a negative number"]),
                );
                    done()
                })
        })

        it("is has a incorrect format for stock and that should be responded by status code of 400", (done) => {
            //setup
            const body = {
                name:"boeing",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "10000",
                stock: "-1",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .post("/products")
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["stock can't be a negative number"]),
                );
                    done()
                })
        })

        it("is has a incorrect format data type for stock or price and that should be responded by status code of 400", (done) => {
            //setup
            const body = {
                name:"boeing",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "b",
                stock: "a",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .post("/products")
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["wrong format price / stock"]),
                );
                    done()
                })
        })
    })

    describe(".put/products/:id", function () {
        it("is has a correct format and that should be responded by status code of 200", (done) => {
            //setup
            const body = {
                name:"boeing di put",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "10000",
                stock: "1",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .put(`/products/${productId}`)
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    done()
                })
        })
        
        it("is has a incorrect token and that should be responded by status code of 401", (done) => {
            //setup
            const body = {
                name:"boeing",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "10000",
                stock: "1",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .put("/products/${productId}")
                .set("access_token", token.customer)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    // console.log(res);
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["unauthorize"]),
                );
                    done()
                    done()
                })
        })

        it("is has a incorrect format and that should be responded by status code of 400", (done) => {
            //setup
            const body = {
                name:"",
                image_url: "",
                price: "",
                stock: "",
                description: "",
                categoryId: "",
            }   
            //execute
            request(app)
                .put(`/products/${productId}`)
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["please fill the product name"]),
                        expect.arrayContaining(["please fill the product image_url"]),
                        expect.arrayContaining(["please fill the product price"]),
                        expect.arrayContaining(["please fill the product stock"]),
                        expect.arrayContaining(["please fill the product description"]),
                        expect.arrayContaining(["please fill the product categoryId"])
                );
                    done()
                })
        })

        it("is has a incorrect format for price and that should be responded by status code of 400", (done) => {
            //setup
            const body = {
                name:"boeing",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "-10000",
                stock: "1",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .put(`/products/${productId}`)
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["price can't be a negative number"]),
                );
                    done()
                })
        })

        it("is has a incorrect format for stock and that should be responded by status code of 400", (done) => {
            //setup
            const body = {
                name:"boeing",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "10000",
                stock: "-1",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .put(`/products/${productId}`)
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["stock can't be a negative number"]),
                );
                    done()
                })
        })

        it("is has a incorrect format data type for stock or price and that should be responded by status code of 400", (done) => {
            //setup
            const body = {
                name:"boeing",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "b",
                stock: "a",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .put(`/products/${productId}`)
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["wrong format price / stock"]),
                );
                    done()
                })
        })

        it("is has a incorrect id and that should be responded by status code of 404", (done) => {
            //setup
            const body = {
                name:"boeing di put",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/800px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg",
                price: "10000",
                stock: "1",
                description: "wow pesawat",
                categoryId: "1",
            }   
            //execute
            request(app)
                .put(`/products/9999`)
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(404)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["ResourceNotFound"]),
                );
                    done()
                })
        })
    })

    describe(".patch/products/:id", function () {
        it("is has a correct format and that should be responded by status code of 200", (done) => {
            //setup
            const body = {
                categoryId: "1",
            }   
            // console.log(categoryId);
            //execute
            request(app)
                .patch(`/products/${productId}`)
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    done()
                })
        })
        
        it("is has a incorrect token and that should be responded by status code of 401", (done) => {
            //setup
            const body = {
                categoryId: "1",
            }   
            //execute
            request(app)
                .patch(`/products/${productId}`)
                .set("access_token", token.customer)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    // console.log(res);
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["unauthorize"]),
                );
                    done()
                    done()
                })
        })

        
        it("is has a incorrect id and that should be responded by status code of 404", (done) => {
            //setup
            const body = {
                categoryId: "1",
            }   
            //execute
            request(app)
                .patch(`/products/9999`)
                .set("access_token", token.admin)
                .send(body)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(404)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["ResourceNotFound"]),
                );
                    done()
                })
        })
    })

    describe(".delete/products/:id", function () {
        it("is has a correct format and that should be responded by status code of 200", (done) => {
            //setup
            //execute
            request(app)
                .delete(`/products/${productId}`)
                .set("access_token", token.admin)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    done()
                })
        })
        
        it("is has a incorrect token and that should be responded by status code of 401", (done) => {
            //setup
            //execute
            request(app)
                .delete(`/products/${productId}`)
                .set("access_token", token.customer)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    // console.log(res);
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["unauthorize"]),
                );
                    done()
                })
        })

        
        it("is has a incorrect id and that should be responded by status code of 404", (done) => {
            //setup
            //execute
            request(app)
                .delete(`/products/9999`)
                .set("access_token", token.admin)
                .end((err, res) => {
                    if (err) done(err) 
            //assert
                    expect(res.statusCode).toEqual(404)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("errors");
                    expect(Array.isArray(res.body.errors)).toEqual(true);
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(["ResourceNotFound"]),
                );
                    done()
                })
        })
    })

})

