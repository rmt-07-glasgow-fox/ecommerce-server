const request = require('supertest')
const app = require('../app')

/*
Plan for products
- have name, description, img_url, price(int, double), stock

endpoints
GET /products
POST /products
PATCH /products/:id
PUT /products/:id
DELETE /products/:id

test
1. successfully input the product
2. empty name
3. price tidak kurang dari 1
4. stock minimal 0
5. need to be login and authorized to be able to CRUD
*/

let id = ''
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJleGFtcGxlMkBtYWlsLmNvbSIsImlhdCI6MTYxMTAyMDg1MX0.ZhrVY9OIRjnRhwpLJMLJH25CVCemPec-pYjMSASVC8M"

//for getting all the products
describe('GET /products (SUCCESS)', function(){
    it('should send response 200 status code', function(done){
        //setup
        request(app)
            .get('/products')
            .set('access_token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJleGFtcGxlMkBtYWlsLmNvbSIsImlhdCI6MTYxMTAyMDg1MX0.ZhrVY9OIRjnRhwpLJMLJH25CVCemPec-pYjMSASVC8M")
            .end(function(err, res){
                if(err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(typeof res.body[0]).toEqual('object')
                done()
            })
    })
})

//need authentication to be able to access product and do CRUD
describe('GET /products (fail)', function(){
    it('should send response 200 status code', function(done){
        //setup
        request(app)
            .get('/products')
            .end(function(err, res){
                if(err) done(err)
                expect(res.statusCode).toEqual(403)
                expect(res.body.message).toEqual("Login Required")
                done()
            })
    })
})

//for posting product 
describe('POST /products (SUCCESS)', function(){
    it('should send response 201 status code', function(done){
        const body = {
            name : "TV",
            image_url : "https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80",
            price : 1000000,
            stock : 1
        }
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function(err, res){
                if(err) done(err)
                id = res.body.id
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('image_url')
                expect(res.body).toHaveProperty('price')
                expect(res.body).toHaveProperty('stock')
                done()
            })
    }) 
})

//if name is empty, price less than 1 and stock is less than 0 should return error
describe('POST /products (FAIL)', function(){
    it('should send response 400 status code', function(done){
        const body = {
            name : '',
            image_url : '',
            price : 0,
            stock : -1
        }
        request(app)
            .post('/products')
            .set('access_token', token)
            .send(body)
            .end(function(err, res){
                if(err) done(err)
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Name is required', 'Minimum price is 1', 'Minimum stock is 1'])
                )
                done()
            })
    }) 
})


//for updating stock
describe('PATCH /products/:id', function(){
    it('should send response 200 status code', function(done){
        const body = {
            stock : 2
        }
        request(app)
            .patch(`/products/${id}`)
            .set('access_token', token)
            .send(body)
            .end(function(err, res){
                if(err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body.stock).toEqual(body.stock)
                done()
            })
    })  
})

//if stock is less than 0
describe('PATCH /products/:id', function(){
    it('should send response 400 status code', function(done){
        const body = {
            stock : -1
        }
        request(app)
            .patch(`/products/${id}`)
            .set('access_token', token)
            .send(body)
            .end(function(err, res){
                if(err) done(err)
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Minimum stock is 1'])
                )
                done()
            })
    })  
})

//for updating the overall product
describe('PUT /products/:id', function(){
    it('should send response 200 status code', function(done){
        const body = {
            name : "TV baru",
            image_url : "",
            price : 500000
        }
        request(app)
            .put(`/products/${id}`)
            .set('access_token', token)
            .send(body)
            .end(function(err, res){
                if(err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body.name).toEqual(body.name)
                expect(res.body.image_url).toEqual(body.image_url)
                expect(res.body.price).toEqual(body.price)
                done()
            })
    })  
})

//if name is empty and price less than 1 should return error
describe('PUT /products/:id', function(){
    it('should send response 400 status code', function(done){
        const body = {
            name : '',
            image_url : '',
            price : 0
        }
        request(app)
            .put(`/products/${id}`)
            .set('access_token', token)
            .send(body)
            .end(function(err, res){
                if(err) done(err)
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Name is required'], ['Minimum price is 1'])
                )
                done()
            })
    })  
})

//for deleting a product
describe('DELETE /products/:id', function(){
    it('should send response 200 status code', function(done){
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', token)
            .end(function(err, res){
                if(err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(res.body.message).toEqual("Product Deleted")
                done()
            })
    })  
})

