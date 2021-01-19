const request = require('supertest')

const app = require('../app')

const { genToken } = require('../helper/jwt')

const { User } = require('../models')

describe('GET /products',function() {
    let access_token = null

    beforeAll(done => {
        User.findOne( {where : { email : 'admin@mail.com'}} )
        .then(user => {
            const payload = { 
                id : user.id, 
                email : user.email 
            }

            access_token = genToken(payload)

            done()
        })
    })

    it('should status 200 fetch all products' ,function (done) {
            //setup
    
            //excecute
            request(app) 
            .get('/products')
            .set('access_token', access_token)
            .end((err, res) => {
                if(err) done(err)
                    
            //assert
                expect(res.statusCode).toEqual(200)
                expect(Array.isArray(res.body)).toEqual(true)
                expect(typeof res.body[0]).toEqual('object')
                expect(res.body[0]).toHaveProperty('id')
                expect(res.body[0]).toHaveProperty('name')
                expect(res.body[0]).toHaveProperty('image_url')
                expect(res.body[0]).toHaveProperty('price')
                expect(res.body[0]).toHaveProperty('stock')
            
                done()
            })
    })
    
})

// =====================================================================================
// ================================= POST CREATE NEW PRODUCTS ==========================
// ======================================================================================

describe('create product POST /products',function() {

        let access_token = null

        beforeAll(done => {
            User.findOne( {where : { email : 'admin@mail.com'}} )
            .then(user => {
                const payload = { 
                    id : user.id, 
                    email : user.email 
                }
    
                access_token = genToken(payload)

                done()
            })
        })

        // ======================== success create ================================
        it('should status 201, product successfull create' ,function(done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
            }
        
            //excecute
            request(app) 
            .set(access_token, 'access_token')
            .post(`/products`)
            .end((err, res) => {
                if(err) done(err)
            
                //assert
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('name')
                expect(res.body.name).toEqual(body.name)
                expect(res.body).toHaveProperty('image_url')
                expect(res.body.image_url).toEqual(body.image_url)
                expect(res.body).toHaveProperty('price')
                expect(res.body.price).toEqual(body.price)
                expect(res.body).toHaveProperty('stock')
                expect(res.body.stock).toEqual(body.stock)


                done()
            })
        })

        // ========================  data requirement tidak diisi ============================
        it('should status code 400, name is required' ,function (done) {
            //setup
            const body = {
                name : '',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
            }
        
            //excecute
            request(app) 
            .post('/products')
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if(err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('name is required')
                done()
            })
        })

        //  ========================= stock diisi minus ================================
        it('should status code 400, stock cant in negative' ,function (done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : -5,
            }
        
            //excecute
            request(app) 
            .post('/products')
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if(err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual(`price / stock can't be negative`)
                done()
            })
        })

        // =================================== price negative ==================================
        it('should status code 400, price cannot negative' ,function (done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : -100000,
                stock : 5,
            }
        
            //excecute
            request(app) 
            .post('/products')
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if(err) done(err)


                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual(`price / stock can't be negative`)
                done()
            })
        })

        // ===========================   diisi type data tidak sesuai ========================
        it('should status code 400, sequelize validation error' ,function (done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 'aaa',
            }
        
            //excecute
            request(app) 
            .post('/products')
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if(err) done(err)


                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(Array.isArray(res.body)).toEqual(true)
                expect(res.body[0]).toHaveProperty('message')
                expect(res.body[0].message).toEqual('allow for number only')
                done()
            })
        })

    describe('failed for getting access_token POST /products', function() {

        // =============================   don have access token  ========================
        it('should status code 401, dont have authentication',function (done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
            }
        
            //excecute
            request(app) 
            .post('/products')
            .send(body)
            .end((err, res) => {
                if(err) done(err)

                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Please login first')
                done()
            })
        })

    })

    describe('failed because not admin login POST /products', function() {
        
        let access_token = null

        beforeAll(done => {
            User.findOne( {where : { email : 'customer@mail.com'}} )
            .then(user => {
                if(user.role == 'admin') {
                    const payload = { 
                        id : user.id, 
                        email : user.email 
                    }
        
                    access_token = genToken(payload)
                    done()
                }
            })
        })
        
        //  ================================= not admin ===================================
        it('not admin, should status code 401, dont have authorization' ,function (done) {
            //setup
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
            }
        
            //excecute
            request(app) 
            .post('/products')
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if(err) done(err)

                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual(`You're not admin`)
                done()
            })
        })
    })
    
})

// ==========================================================================================
// ========================= testing form update products ===================================
// ==========================================================================================

describe('PUT /products/:id',function() {
    afterAll(done => {
        models.sequelize.close()
        done()
    })

    describe('success request update product PUT /products', function() {
        beforeAll(done => {
            User.findOne( {where : { email : 'admin@mail.com'}} )
            .then(user => {
                const payload = { 
                    id : user.id, 
                    email : user.email 
                }
    
                access_token = genToken(payload)
                done()
            })
        })
    

        //get access_token

        // ============================== successfull update ===========================
        it('should status 200 update by id' ,function () {
            //setup
            let id = 1
            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
            }
        
            //excecute
            request(app) 
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .end((err, res) => {
                if(err) done(err)

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
    })

    describe('failed bad request update product PUT /products', function() {

        // ===========   tidak ada access_token ===================
        it('should status code 400, sequelize validation error' ,function (done) {
            //setup
            let id = 1

            const body = {
                name : 'baju keren',
                image_url : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/1/6708815/6708815_9154e541-994c-49db-a5e6-c2a0657b1fe6_712_712.jpg',
                price : 100000,
                stock : 5,
            }
        
            //excecute
            request(app) 
            .put(`/products/${id}`)
            .send(body)
            .end((err, res) => {
                if(err) done(err)

                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                //error
                done()
            })
        

        })

    })

    describe('failed for not admin PUT /products', function() {
        let access_token = null

        beforeAll(done => {
            User.findOne( {where : { email : 'customer@mail.com'}} )
            .then(user => {
                if(user.role == 'admin') {
                    const payload = { 
                        id : user.id, 
                        email : user.email 
                    }
        
                    access_token = genToken(payload)
                    done()
                }
                done()
            })
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
            }
        
            //excecute
            request(app) 
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if(err) done(err)

                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                done()
            })
        })
    })

    describe('failed for bad request update products PUT /porducts', function() {
        let access_token = null

        beforeAll(done => {
            User.findOne( {where : { email : 'admin@mail.com'}} )
            .then(user => {
                if(user.role == 'admin') {
                    const payload = { 
                        id : user.id, 
                        email : user.email 
                    }
        
                    access_token = genToken(payload)
                    done()
                }
                done()
            })
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
            }
        
            //excecute
            request(app) 
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if(err) done(err)

                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                done()
            })
    
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
            }
        
            //excecute
            request(app) 
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if(err) done(err)
                
                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                done()
            })
        })
    })
    
})

// =========================================================================================
// ===========================     delete product    =======================================
// =========================================================================================

describe('DELETE /products',function() {
   
    describe('success for deleting product DELETE /products', function() {
        let access_token = null

        beforeAll(done => {
            User.findOne( {where : { email : 'admin@mail.com'}} )
            .then(user => {
                const payload = { 
                    id : user.id, 
                    email : user.email 
                }
        
                access_token = genToken(payload)
                done()
            })
        })

        // ===================== success delete ================================
        it('should status 200 delete success',function (done) {
            //setup
            let id = 1
        
            //excecute
            request(app) 
            .set("access_token", access_token)
            .delete(`/products/${id}`)
            .end((err, res) => {
                if(err) done(err)

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg)

                done()
            })
        })
    })

    describe('failed for error in access_token DELETE /products' , function () {

        // ===================== not access_token =============================
        it('should status 400 dont have authentication',function (done) {
            //setup
            let id = 1
        
            //excecute
            request(app) 
            .delete(`/products/${id}`)
            .end((err, res) => {
                if(err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')

                done()
            })
        })
    })

    describe('failed for not admin DELETE /products', function() {
        let access_token = null

        beforeAll(done => {
            User.findOne( {where : { email : 'customer@mail.com'}} )
            .then(user => {
                if(user.role == 'admin') {
                    const payload = { 
                        id : user.id, 
                        email : user.email 
                    }
        
                    access_token = genToken(payload)
                    done()
                }
                done()
            })
        })


        // ===================== not admin =============================
        it('should status 401 error authorization',function (done) {
            //setup
            let id = 1
        
            //excecute
            request(app) 
            .set('access_token', access_token)
            .delete(`/products/${id}`)
            .end((err, res) => {
                if(err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')

                done()
            })
        })
    })

 
})


