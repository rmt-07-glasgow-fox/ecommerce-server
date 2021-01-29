const request = require('supertest')
const app = require('../app')
const { User, Product } = require('../models/')
const { generateToken } = require('../helpers/jsonwebtoken')
const clearUser = require('./helpers/clear-users')

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
urutan CRUD
*/

let id = ''
let token_admin = ""
let token_user = ""

//POST 

describe('CRUD for products', function(){
    beforeAll(function(done){
        User.create({
            email: 'example1@mail.com',
            password: 'password',
            role: 'user'
        })
        .then(data => {
            return User.findOne({
                where: {
                    email: data.email
                }
            })
        })
        .then(user => {
            const payload = {
                id : user.id,
                email : user.email,
                role : user.role
            }
            const access_token = generateToken(payload)
            token_user = access_token
            return User.findOne({
                where: {
                    email: 'admin@mail.com'
                }
            })
        })
        .then(user => {
            const payload = {
                id : user.id,
                email : user.email,
                role : user.role
            }
            const access_token = generateToken(payload)
            token_admin = access_token
            done()
        })
        .catch()
    })
    afterAll(function(done) {
        clearUser()
        .then(function() {
            done()
        })
        .catch()
     })
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
                .set('access_token', token_admin)
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
    
    describe('POST /products (FAIL)', function(){
        it('should send response 403 status code for not having an access token', function(done){
            const body = {
                name : "TV",
                image_url : "https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80",
                price : 1000000,
                stock : 1
            }
            request(app)
                .post('/products')
                .send(body)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res.statusCode).toEqual(403)
                    expect(res.body.message).toEqual("Login Required")
                    done()
                })
        }) 
    })
    
    describe('POST /products (FAIL)', function(){
        it('should send response 401 status code for having an access token but not an admin', function(done){
            const body = {
                name : "TV",
                image_url : "https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80",
                price : 1000000,
                stock : 1
            }
            request(app)
                .post('/products')
                .set("access_token", token_user)
                .send(body)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res.statusCode).toEqual(401)
                    expect(res.body.message).toEqual("Do not have access")
                    done()
                })
        }) 
    })
    
    describe('POST /products (FAIL)', function(){
        it('should send response 400 status code for having an empty name, price less than 1 and stock less than 1', function(done){
            const body = {
                name : '',
                image_url : '',
                price : 0,
                stock : -1
            }
            request(app)
                .post('/products')
                .set('access_token', token_admin)
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
    
    //GET
    
    //for getting all the products
    describe('GET /products (SUCCESS)', function(){
        it('should send response 200 status code', function(done){
            //setup
            request(app)
                .get('/products')
                .set('access_token', token_admin)
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
        it('should send response 403 status code for not having an access token', function(done){
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
    
    //PATCH
    
    //for updating stock
    describe('PATCH /products/:id', function(){
        it('should send response 200 status code', function(done){
            const body = {
                stock : 2
            }
            request(app)
                .patch(`/products/${id}`)
                .set('access_token', token_admin)
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
    
    describe('PATCH /products/:id', function(){
        it('should send response 403 status code for not having an access token', function(done){
            const body = {
                stock : 2
            }
            request(app)
                .patch(`/products/${id}`)
                .send(body)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res.statusCode).toEqual(403)
                    expect(res.body.message).toEqual("Login Required")
                    done()
                })
        })  
    })
    
    describe('PATCH /products/:id', function(){
        it('should send response 401 status code for other than admins', function(done){
            const body = {
                stock : 2
            }
            request(app)
                .patch(`/products/${id}`)
                .set('access_token', token_user)
                .send(body)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res.statusCode).toEqual(401)
                    expect(res.body.message).toEqual("Do not have access")
                    done()
                })
        })  
    })
    
    //if stock is less than 1
    describe('PATCH /products/:id', function(){
        it('should send response 400 status code', function(done){
            const body = {
                stock : -1
            }
            request(app)
                .patch(`/products/${id}`)
                .set('access_token', token_admin)
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
    
    //PUT
    
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
                .set('access_token', token_admin)
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
    
    describe('PUT /products/:id', function(){
        it('should send response 403 status code for not having an access token', function(done){
            const body = {
                name : "TV baru",
                image_url : "",
                price : 500000
            }
            request(app)
                .put(`/products/${id}`)
                .send(body)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res.statusCode).toEqual(403)
                    expect(res.body.message).toEqual("Login Required")
                    done()
                })
        })  
    })
    
    describe('PUT /products/:id', function(){
        it('should send response 401 status code for other than admins', function(done){
            const body = {
                name : "TV baru",
                image_url : "",
                price : 500000
            }
            request(app)
                .put(`/products/${id}`)
                .set('access_token', token_user)
                .send(body)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res.statusCode).toEqual(401)
                    expect(res.body.message).toEqual("Do not have access")
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
                .set('access_token', token_admin)
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
    
    //DELETE
    
    //for deleting a product
    describe('DELETE /products/:id', function(){
        it('should send response 200 status code', function(done){
            request(app)
                .delete(`/products/${id}`)
                .set('access_token', token_admin)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res.statusCode).toEqual(200)
                    expect(res.body.message).toEqual("Product Deleted")
                    done()
                })
        })  
    })
    
    describe('DELETE /products/:id', function(){
        it('should send response 403 status code for not having an access token', function(done){
            request(app)
                .delete(`/products/${id}`)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res.statusCode).toEqual(403)
                    expect(res.body.message).toEqual("Login Required")
                    done()
                })
        })  
    })
    
    describe('DELETE /products/:id', function(){
        it('should send response 401 status code for other than admins', function(done){
            request(app)
                .delete(`/products/${id}`)
                .set('access_token', token_user)
                .end(function(err, res){
                    if(err) done(err)
                    expect(res.statusCode).toEqual(401)
                    expect(res.body.message).toEqual("Do not have access")
                    done()
                })
        })  
    })
})


