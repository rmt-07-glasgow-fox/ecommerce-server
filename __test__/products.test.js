// const { doesNotMatch } = require('assert')
// const { expect } = require('@jest/globals')
const request = require('supertest')

const app = require('../app')
const { login } = require('../controller/userController')

const clearProduct = require('./helpers/clear-prod-test')

const models = require('../models')

let token = null


describe('GET /products',function() {
    beforeAll(function() {
        let data = {
            id : 1,
            email : "admin@gmail.com"
        }

        token = login()
    }) 

    it('should status 200 fetch all products' ,function (done) {
        //setup
    
        //excecute
        request(app) 
        .get('/products')
        .end((err, res) => {
            if(err) done(err)
                
        //assert
        expect(res.statusCode).toEqual(200)
        done()
        })
    })
})

// =====================================================================================
// ================================= POST CREATE NEW PRODUCTS =========================
// ======================================================================================

describe('POST /products',function() {

    describe('good params', function () {
        beforeAll(function() {
            login()
        }) 

        // ======================== berhasil dan benar ================================
        it('should status 201, product successfull create' ,function(done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .put(`/products`)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('msg')
            expect(res.body).toHaveProperty('id')
            expect(typeof body.id).toEqual('number')
            expect(res.body).toHaveProperty('name')
            expect(typeof body.name).toEqual('string')
            expect(res.body).toHaveProperty('image_url')
            expect(typeof body.image_url).toEqual('string')
            expect(res.body).toHaveProperty('price')
            expect(typeof body.price).toEqual('number')
            expect(res.body).toHaveProperty('stock')
            expect(typeof body.stock).toEqual('number')
            done()
        })
    })

    describe('bad params', function() {
        beforeAll(function() {
            login()
        }) 

        // =============================   don have access token  ========================
        it('should status code 401, dont have authentication',function (done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .post('/products')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            done()
        })

        //  ================================= not admin ===================================
        it('not admin, should status code 401, dont have authorization' ,function (done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .post('/products')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            done()
        })

        // ========================  data requirement tidak diisi ============================
        it('should status code 400, name must be filled' ,function (done) {
            //setup
            const body = {
                name : '',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .post('/products')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            done()
        })

        //  ========================= stock diisi minus ================================
        it('should status code 400, stock cant in negative' ,function (done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : -5,
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .post('/products')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            done()
        })

        // =================================== price negative ==================================
        it('should status code 400, price cannot negative' ,function (done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : -100000,
                stock : 5,
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .post('/products')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            done()
        })

        // ===========================   diisi type data tidak sesuai ===================
        it('should status code 400, sequelize validation error' ,function (done) {
            //setup
            const body = {
                name : 4444,
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : '5',
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .post('/products')
            .send(body)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            done()
        })

    })
    
})

// =========================================================================================
// ========================= testing form update products ===================================
// =========================================================================================

describe('PUT /products/:id',function() {

    beforeAll(function() {
        login()
    }) 

    afterAll(function(done) {
        clearProduct()
        .then(() => {
            models.sequelize.close()
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    describe('good params', function() {

        // ============================== successfull update ===========================
        it('should status 200 update by id' ,function () {
            //setup
            let id = 1
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .put(`/products/${id}`)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('msg')
            expect(res.body).toHaveProperty('id')
            expect(typeof body.id).toEqual('number')
            expect(res.body).toHaveProperty('name')
            expect(typeof body.name).toEqual('string')
            expect(res.body).toHaveProperty('image_url')
            expect(typeof body.image_url).toEqual('string')
            expect(res.body).toHaveProperty('price')
            expect(typeof body.price).toEqual('number')
            expect(res.body).toHaveProperty('stock')
            expect(typeof body.stock).toEqual('number')
            done()
        })
    })

    describe('bad params', function() {

        // ===========   tidak ada access_token ===================
        it('should status code 400, sequelize validation error' ,function (done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .put(`/products/${id}`)
            .send(body)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            done()
        })

        // ===========   not admin ===================
        it('should status code 400, sequelize validation error' ,function (done) {
            //setup
            let id = 1
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .put(`/products/${id}`)
            .send(body)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            done()
        })

        // ===========   stock minus ===================
        it('should status code 400, sequelize validation error' ,function (done) {
            //setup

            let id = 1
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : -5,
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .put(`/products/${id}`)
            .send(body)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            done()
        })

        // ===========   diisi type data tidak sesuai ===================
        it('should status code 400, sequelize validation error' ,function (done) {
            //setup
            let id = 1
            const body = {
                name : 4444,
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : '5',
                access_token : req.headers.access_token
            }
        
            //excecute
            request(app) 
            .put(`/products/${id}`)
            .send(body)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            done()
        })
    })
    
})

// =========================================================================================
// ===========================     delete product    =======================================
// =========================================================================================

describe('DELETE /products',function() {

    describe('good params', function() {

        // ===================== success delete ================================
        it('should status 200',function (done) {
            //setup
            let id = 1
        
            //excecute
            request(app) 
            .delete(`/products/${id}`)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')

            done()
        })
    })

    describe('bad params' , function () {


        // ===================== not access_token =============================
        it('should status 400 dont have authentication',function (done) {
            //setup
            let id = 1
        
            //excecute
            request(app) 
            .delete(`/products/${id}`)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')

            done()
        })


        // ===================== not admin =============================
        it('should status 401 error authorization',function (done) {
            //setup
            let id = 1
        
            //excecute
            request(app) 
            .delete(`/products/${id}`)
            .end((err, res) => {
                if(err) done(err)
            })
        
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')

            done()
        })
    })
})


