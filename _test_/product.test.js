const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { hashPassword } = require('../helpers/bcrypt')
let access_token;
let productId;
let productName;


beforeAll(done => {
    queryInterface.bulkInsert('Users', [{
        email: 'user@mail.com',
        password: hashPassword('okokok'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {returning: true })
        .then(user => {
            access_token = generateToken({id: user[0].id, email: user[0].email})

            console.log(access_token, "before create")
            return queryInterface.bulkInsert('Products', [{
                name: "baju",
                image_url: "www.baju.com",
                price: 1000000,
                stock: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }], {returning: true })
        })
        .then(product => {
            productId = product[0].id
            productName = product[0].name
            done()
        })
        .catch(err => {
            console.log(err, "catch error test")
            done(err)
        })
   
    
})

afterAll(done => {
    queryInterface.bulkDelete('Users')
        .then(() => {
            return queryInterface.bulkDelete('Products')
        })
        .then(() => {
            done()
        })
        .catch(err => {
            done(err)
        })
})






describe("Product Test", () => {
    describe('Create Product Success', () => {
        test('succes create product', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    name: "baju",
                    image_url: "www.baju.com",
                    price: 1000000,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name', 'baju')
                    expect(body).toHaveProperty('image_url', 'www.baju.com')
                    expect(body).toHaveProperty('price', 1000000)
                    expect(body).toHaveProperty('stock', 2)
                    done()
                })
        })
    })
   
    describe('Create Product Fail', () => {
        test('Fail create product because do not carry access_token ', done => {
            request(app)
                .post('/products')
                .send({
                    name: "",
                    image_url: "www.baju.com",
                    price: 1000000,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Please login first')
                    console.log(body, "ini dari fail name")
                    done()
                })
        })
        test('Fail create product because access_token not the same', done => {
            request(app)
                .post('/products')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoia2lybm80MkBtYWlsLmNvbSIsImlhdCI6MTYwNzUwNzQ3NH0.bNOVWDrtDbcgsNJVTs5YSJ7dkTCZ6u1TyjTSvS6puqE')
                .send({
                    name: "",
                    image_url: "www.baju.com",
                    price: 1000000,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Please login first')
                    console.log(body, "ini dari fail name")
                    done()
                })
        })
        test('Fail create product because name empty', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    name: "",
                    image_url: "www.baju.com",
                    price: 1000000,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Please fill in your product name')
                    console.log(body, "ini dari fail name")
                    done()
                })
        })
        test('Fail create product because imageUrl empty', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    name: "baju",
                    image_url: "",
                    price: 1000000,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Please fill in your product image url')
                    done()
                })
        })
    
        
        test('Fail create product because price empty', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send( {
                    name: "baju",
                    image_url: "www.baju.com",
                    price: '',
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Please fill in your product price')
                    done()
                })
        })
        test('Fail create product because price contains a string', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send( {
                    name: "baju",
                    image_url: "www.baju.com",
                    price: 'sasa',
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'You cannot fill in your product price with string')
                    done()
                })
        })
        test('Fail create product because price lowwer then 1', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send( {
                    name: "baju",
                    image_url: "www.baju.com",
                    price: -1,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Price cannot be lowwer then 1')
                    done()
                })
        })
        test('Fail create product because stock minus value ', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send( {
                    name: "baju",
                    image_url: "www.baju.com",
                    price: 1,
                    stock: -1,
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Stock cannot be minus number')
                    done()
                })
        })
        test('Fail create product because stock empty ', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send( {
                    name: "baju",
                    image_url: "www.baju.com",
                    price: 1,
                    stock: '',
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Please fill in your product stock')
                    done()
                })
        })
        test('Fail create product because stock contains a string', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send( {
                    name: "baju",
                    image_url: "www.baju.com",
                    price: 1,
                    stock: 'sada'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'You cannot fill in your product stock with string')
                    done()
                })
        })

        
    })
    describe("Read Product Succes", () => {
        test("succes read", done => {
            request(app)
                .get('/products')
                .set('access_token', access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(200)
                    expect(body[0]).toHaveProperty('name', expect.any(String))
                    expect(body[0]).toHaveProperty('image_url', expect.any(String))
                    expect(body[0]).toHaveProperty('price', expect.any(Number))
                    expect(body[0]).toHaveProperty('stock', expect.any(Number))
                    done()
                })
        })
    })
    describe("Read Product Fail", () => {
        test("Fail read", done => {
            request(app)
                .get('/products')
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Please login first')
                    done()
                })
        })
    })
    describe("Edit Product Success", () => {
        test("Edit Product Success", done => {
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: "sepatu",
                    image_url: "www.sepatu.com",
                    price: 3,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    console.log(body, '<-=--- dari edit test')
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('name', 'sepatu')
                    expect(body).toHaveProperty('image_url', "www.sepatu.com")
                    expect(body).toHaveProperty('price', 3)
                    expect(body).toHaveProperty('stock', 2)
                    done()
                })
        })
    })
    describe("Edit Product Fail", () => {
        test("Fail Edit Product because not access_token", done => {
            request(app)
                .put(`/products/${productId}`)
                .send({
                    name: "sepatu",
                    image_url: "www.sepatu.com",
                    price: 1,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Please login first')
                    done()
                })
        })
        test("Fail Edit Product because access_token is not the same", done => {
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoia2lybm80MkBtYWlsLmNvbSIsImlhdCI6MTYwNzUwNzQ3NH0.bNOVWDrtDbcgsNJVTs5YSJ7dkTCZ6u1TyjTSvS6puqE')
                .send({
                    name: "sepatu",
                    image_url: "www.sepatu.com",
                    price: 1,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Please login first')
                    done()
                })
        })
        test("Fail Edit Product because name empty", done => {
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: "",
                    image_url: "www.sepatu.com",
                    price: 1,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Please fill in your product name')
                    done()
                })
        })
        test("Fail Edit Product because image url empty", done => {
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: "sadada",
                    image_url: "",
                    price: 1,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Please fill in your product image url')
                    done()
                })
        })
        test("Fail Edit Product because price minus value", done => {
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: "Pakaian",
                    image_url: "www.sepatu.com",
                    price: -1,
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Price cannot be lowwer then 1')
                    done()
                })
        })
        test("Fail Edit Product because price contains string", done => {
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: "sendal",
                    image_url: "www.sepatu.com",
                    price: "sdadas",
                    stock: 2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'You cannot fill in your product price with string')
                    done()
                })
        })
        test("Fail Edit Product because stock minus value", done => {
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: "Pakaian",
                    image_url: "www.sepatu.com",
                    price: 1,
                    stock: -1
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Stock cannot be minus number')
                    done()
                })
        })
        test("Fail Edit Product because stock contains string", done => {
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: "jaket",
                    image_url: "www.sepatu.com",
                    price: 2,
                    stock: "dua ratus"
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'You cannot fill in your product stock with string')
                    done()
                })
        })
    })
    describe("Delete Product success", () => {
        test("Fail Edit Product because not access_token", done => {
            request(app)
                .delete(`/products/${productId}`)
                .set('access_token', access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(200)
                    expect(body).toBe(`Product succes to delete`)
                    done()
                })
        })
    })
    describe('Delete Product Fail', () =>  {
        test("Fail Edit Product because access_token is not the same", done => {
            request(app)
                .delete(`/products/${productId}`)
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoia2lybm80MkBtYWlsLmNvbSIsImlhdCI6MTYwNzUwNzQ3NH0.bNOVWDrtDbcgsNJVTs5YSJ7dkTCZ6u1TyjTSvS6puqE')
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Please login first')
                    done()
                })
        })
        test("Fail Delete Product because not access_token", done => {
            request(app)
                .delete(`/products/${productId}`)
                .end((err, res) => {
                    const { body, status } = res
                    if(err)return done(err);
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Please login first')
                    done()
                })
        })
    })
})