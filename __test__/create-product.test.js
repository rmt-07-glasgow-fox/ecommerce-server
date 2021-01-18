const request = require('supertest')
const app = require('../app')
const {User} = require('../models/')
const {genToken} = require('../helpers/jwt')
const clearProduct = require('../helpers/clear-products')
const models = require('../models/')

describe(`POST /products`, function(){
    let access_token
    beforeAll((done)=>{
       User.findOne({where: {email: 'admin@mail.com'}})
       .then(data =>{
           let payload = {
               id: data.id,
               email: data.email
           }
           access_token = genToken(payload)
           done()
       })
    })

    

    it('should send response 201 status code', function (done){
        let body = {
            name: 'jeans',
            image_url: 'https://media.gq.com/photos/5f316a12092046da7abdb421/master/w_2000,h_1333,c_limit/COS-regular-fit-recycled-cotton-jeans.jpg',
            price: 45000,
            stock: 5
        }
        request(app)
        .post('/products')
        .set('access_token', `${access_token}`)
        .send(body)
        .end(function (err, res){
            if(err) done(err)

            expect(res.statusCode).toEqual(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('id')
            expect(typeof res.body.id).toEqual('number')
            expect(res.body).toHaveProperty('name')
            expect(typeof res.body.name).toEqual('string')
            expect(res.body).toHaveProperty('image_url')
            expect(typeof res.body.image_url).toEqual('string')
            expect(res.body).toHaveProperty('price')
            expect(typeof res.body.price).toEqual('number')
            expect(res.body).toHaveProperty('stock')
            expect(typeof res.body.stock).toEqual('number')

            done()
        })
    })

    it('should send response 401 status code', function (done){
        let body = {
            name: 'jeans',
            image_url: 'https://media.gq.com/photos/5f316a12092046da7abdb421/master/w_2000,h_1333,c_limit/COS-regular-fit-recycled-cotton-jeans.jpg',
            price: 45000,
            stock: 5
        }
        request(app)
        .post('/products')
        .send(body)
        .end(function (err, res){
            if(err) done(err)

            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('errors')
            expect(res.body.errors).toEqual(
                expect.arrayContaining(['jwt is not provided'])
            )
            done()
        })
    })

    it('should send response 401 status code', function (done){
        let body = {
            name: 'jeans',
            image_url: 'https://media.gq.com/photos/5f316a12092046da7abdb421/master/w_2000,h_1333,c_limit/COS-regular-fit-recycled-cotton-jeans.jpg',
            price: 45000,
            stock: 5
        }
        request(app)
        .post('/products')
        .set('access_token', 'asdkasjdkasd')
        .send(body)
        .end(function (err, res){
            if(err) done(err)

            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('errors')
            expect(res.body.errors).toEqual(
                expect.arrayContaining(['jwt is not provided'])
            )
            done()
        })
    })

    it('should send response 400 status code', function (done){
        let body = {
            name: '',
            image_url: '',
            price: 0,
            stock: 0
        }
        request(app)
        .post('/products')
        .set('access_token', `${access_token}`)
        .send(body)
        .end(function (err, res){
            if(err) done(err)

            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(res.body.errors).toEqual(
                expect.arrayContaining(['Name is required', 'Image Url is required'])
            )
            done()
        })
    })

    it('should send response 400 status code', function (done){
        let body = {
            name: 'jeans',
            image_url: 'https://media.gq.com/photos/5f316a12092046da7abdb421/master/w_2000,h_1333,c_limit/COS-regular-fit-recycled-cotton-jeans.jpg',
            price: -45000,
            stock: 5
        }
        request(app)
        .post('/products')
        .set('access_token', `${access_token}`)
        .send(body)
        .end(function (err, res){
            if(err) done(err)

            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(res.body.errors).toEqual(
                expect.arrayContaining(['Price cant be negative'])
            )
            done()
        })
    })

    it('should send response 400 status code', function (done){
        let body = {
            name: 'jeans',
            image_url: 'https://media.gq.com/photos/5f316a12092046da7abdb421/master/w_2000,h_1333,c_limit/COS-regular-fit-recycled-cotton-jeans.jpg',
            price: 45000,
            stock: -5
        }
        request(app)
        .post('/products')
        .set('access_token', `${access_token}`)
        .send(body)
        .end(function (err, res){
            if(err) done(err)

            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(res.body.errors).toEqual(
                expect.arrayContaining(['Stock cant be negative'])
            )
            done()
        })
    })

    it('should send response 400 status code', function (done){
        let body = {
            name: 'jeans',
            image_url: 'https://media.gq.com/photos/5f316a12092046da7abdb421/master/w_2000,h_1333,c_limit/COS-regular-fit-recycled-cotton-jeans.jpg',
            price: 'sasdsd',
            stock: 5
        }
        request(app)
        .post('/products')
        .set('access_token', `${access_token}`)
        .send(body)
        .end(function (err, res){
            if(err) done(err)

            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(res.body.errors).toEqual(
                expect.arrayContaining(['Price should be a number'])
            )
            done()
        })
    })
    it('should send response  400 status code', function (done){
        let body = {
            name: 'jeans',
            image_url: 'https://media.gq.com/photos/5f316a12092046da7abdb421/master/w_2000,h_1333,c_limit/COS-regular-fit-recycled-cotton-jeans.jpg',
            price: 45000,
            stock: 'sadjasdjk'
        }
        request(app)
        .post('/products')
        .set('access_token', `${access_token}`)
        .send(body)
        .end(function (err, res){
            if(err) done(err)

            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(res.body.errors).toEqual(
                expect.arrayContaining(['Stock should be a number'])
            )
            done()
        })
    })
})