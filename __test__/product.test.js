const req = require('supertest')
const app = require('../app')
const {cleanProduct,cleanUser} = require('./helper/cleanDb')
const {seederUser,seederProduct} = require('./helper/seeder')
const {User,Product} = require('../models/index')
const {generateToken} = require('../helper/jwt')

let accesstoken = ''
let tempId = ''
afterAll((done)=>{
    cleanUser()
    .then(()=>{
        return cleanProduct()
    })
    .then(()=>{
        done()
    })
    .catch(err=>{
        console.log(err);
    })
})
beforeAll((done)=>{
    seederUser()
    .then(()=>{
        return User.findOne()
    })
    .then((data) => {
        let user = {
            id:data.id,
            email:data.email,
            role:data.role
        }
        accesstoken = generateToken(user)
        return seederProduct()
    })
    .then(()=>{
        return Product.findOne()
    })
    .then((data)=>{
        tempId = data.id
        done()
    })
    .catch(err=>{
        done(err)
    })
})

describe('POST /product',function(){
    //valid
    it('valid add should send response 201 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'url',
            price: 100000,
            stock: 10
        };

        //execute
        req(app)
        .post('/product')
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(201)
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('imageUrl')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('stock')
            expect(typeof res.body.id).toEqual('number')
            expect(typeof res.body.name).toEqual('string')
            expect(typeof res.body.imageUrl).toEqual('string')
            expect(typeof res.body.price).toEqual('number')
            expect(typeof res.body.stock).toEqual('number')
            expect(res.body.id).toEqual(expect.any(Number))
            expect(res.body.name).toBe('card')
            expect(res.body.imageUrl).toBe('url')
            expect(res.body.price).toBe(100000)
            expect(res.body.stock).toBe(10)
            done()
        })
    })

    //name empty
    it('name empty should send response 400 status code', function(done){
        //setup
        const body = {
            name:'',
            imageUrl:'url',
            price: 100000,
            stock: 10
        };

        //execute
        req(app)
        .post('/product')
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation notEmpty on name failed'])
            )
            done()
        })
    })

    //imageUrl empty
    it('imageUrl empty should send response 400 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'',
            price: 100000,
            stock: 10
        };

        //execute
        req(app)
        .post('/product')
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation notEmpty on imageUrl failed'])
            )
            done()
        })
    })

    //insert price with string or empty string
    it('price empty should send response 400 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'qwerty',
            price: '',
            stock: 10
        };

        //execute
        req(app)
        .post('/product')
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual('invalid input syntax for type integer: ""')
            done()
        })
    })

    //insert stock with string or empty string
    it('stock empty should send response 400 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'qwerty',
            price: 100000,
            stock: 'ABC'
        };

        //execute
        req(app)
        .post('/product')
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual('invalid input syntax for type integer: "ABC"')
            done()
        })
    })

    //insert price with value < 0
    it('price < 0 should send response 400 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'qwerty',
            price: -10,
            stock: 100
        };

        //execute
        req(app)
        .post('/product')
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation min on price failed'])
            )
            done()
        })
    })

    //insert stock with value < 0
    it('stock < 0 should send response 400 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'qwerty',
            price: 100000,
            stock: -20
        };

        //execute
        req(app)
        .post('/product')
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation min on stock failed'])
            )
            done()
        })
    })
})
//=================================================================================================

describe('PUT /product/:id',function(){    
    //valid
    it('valid put should send response 200 status code', function(done){
        //setup
        const body = {
            name:'card2',
            imageUrl:'url2',
            price: 200000,
            stock: 20
        };

        //execute
        req(app)
        .put(`/product/${tempId}`)
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('imageUrl')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('stock')
            expect(typeof res.body.id).toEqual('number')
            expect(typeof res.body.name).toEqual('string')
            expect(typeof res.body.imageUrl).toEqual('string')
            expect(typeof res.body.price).toEqual('number')
            expect(typeof res.body.stock).toEqual('number')
            expect(res.body.id).toEqual(expect.any(Number))
            expect(res.body.name).toBe('card2')
            expect(res.body.imageUrl).toBe('url2')
            expect(res.body.price).toBe(200000)
            expect(res.body.stock).toBe(20)
            done()
        })
    })

    //name empty
    it('name empty should send response 400 status code', function(done){
        //setup
        const body = {
            name:'',
            imageUrl:'url',
            price: 100000,
            stock: 10
        };

        //execute
        req(app)
        .put(`/product/${tempId}`)
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation notEmpty on name failed'])
            )
            done()
        })
    })

    //imageUrl empty
    it('imageUrl empty should send response 400 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'',
            price: 100000,
            stock: 10
        };

        //execute
        req(app)
        .put(`/product/${tempId}`)
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation notEmpty on imageUrl failed'])
            )
            done()
        })
    })

    //insert price with string or empty string
    it('price empty should send response 400 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'qwerty',
            price: '',
            stock: 10
        };

        //execute
        req(app)
        .put(`/product/${tempId}`)
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual('invalid input syntax for type integer: ""')
            done()
        })
    })

    //insert stock with string or empty string
    it('stock empty should send response 400 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'qwerty',
            price: 100000,
            stock: 'ABC'
        };

        //execute
        req(app)
        .put(`/product/${tempId}`)
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual('invalid input syntax for type integer: "ABC"')
            done()
        })
    })

    //insert price with value < 0
    it('price < 0 should send response 400 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'qwerty',
            price: -10,
            stock: 100
        };

        //execute
        req(app)
        .put(`/product/${tempId}`)
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation min on price failed'])
            )
            done()
        })
    })

    //insert stock with value < 0
    it('stock < 0 should send response 400 status code', function(done){
        //setup
        const body = {
            name:'card',
            imageUrl:'qwerty',
            price: 100000,
            stock: -20
        };

        //execute
        req(app)
        .put(`/product/${tempId}`)
        .send(body)
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual(
                expect.arrayContaining(['Validation min on stock failed'])
            )
            done()
        })
    })
}) 
//=================================================================================================

describe('GET /product/:id',function(){ 
    //delete
    it('get by id should send response 200 status code', function(done){
        //setup
        //execute
        req(app)
        .get(`/product/${tempId}`)
        .send()
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('imageUrl')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('stock')
            expect(typeof res.body.id).toEqual('number')
            expect(typeof res.body.name).toEqual('string')
            expect(typeof res.body.imageUrl).toEqual('string')
            expect(typeof res.body.price).toEqual('number')
            expect(typeof res.body.stock).toEqual('number')
            expect(res.body.id).toEqual(expect.any(Number))
            expect(res.body.name).toBe('card2')
            expect(res.body.imageUrl).toBe('url2')
            expect(res.body.price).toBe(200000)
            expect(res.body.stock).toBe(20)
            done()
        })
    })
})
//=================================================================================================

describe('GET /product',function(){ 
    //delete
    it('get by id should send response 200 status code', function(done){
        //setup
        //execute
        req(app)
        .get(`/product/${tempId}`)
        .send()
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object');
            expect(res.body.name).toBe('card2')
            expect(res.body.imageUrl).toBe('url2')
            expect(res.body.price).toBe(200000)
            expect(res.body.stock).toBe(20)
            done()
        })
    })
})
//=================================================================================================

describe('DELETE /product/:id',function(){ 
    //delete
    it('delete should send response 200 status code', function(done){
        //setup
        //execute
        req(app)
        .delete(`/product/${tempId}`)
        .send()
        .set('accesstoken',accesstoken)
        .end(function(err,res){
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Deleted successfully')
            done()
        })
    })
})