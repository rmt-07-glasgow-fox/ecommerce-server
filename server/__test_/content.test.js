const request = require('supertest')
const app = require('../app')
const clearContent = require("./helpers/clearContents")
const models = require('../models')
let access_token = ""
let params = 0

describe('CRUD /contents', function () {

    afterAll(function (done) {
        clearContent()
            .then(() => {
                models.sequelize.close()
                done()
            })
            .catch(console.log)
    })

    beforeAll(function (done) {
        request(app)
            .post('/login')
            .send({
                email: process.env.EMAIL,
                password: process.env.PASSWORD
            })
            .end(function (err, res) {
                if (err) done(err)
                access_token = res.body.access_token
                done()
            })
    })

    it('POST response with 201 status code', function (done) {
        //setup
        const body = {
            name: "Sepatu Nike",
            category: "fashion",
            price: 300000,
            stock: 50,
            imageUrl: "https://unsplash.com"
        }
        //execute
        request(app)
            .post('/contents')
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('name')
                expect(res.body.name).toEqual(body.name)
                expect(res.body).toHaveProperty('category')
                expect(res.body.category).toEqual(body.category)
                expect(res.body).toHaveProperty('stock')
                expect(res.body.stock).toEqual(body.stock)
                expect(res.body).toHaveProperty('price')
                expect(res.body.price).toEqual(body.price)
                expect(res.body).toHaveProperty('imageUrl')
                expect(res.body.imageUrl).toEqual(body.imageUrl)
                done()
            })
    })

    it('POST response with 400 status code', function (done) {
        //setup
        const body = {
            name: "",
            category: "",
            stock: "",
            price: "",
            imageUrl: ""
        }
        //execute
        request(app)
            .post('/contents')
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errorMessage')
                expect(Array.isArray(res.body.errorMessage)).toEqual(true)
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Name is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Category is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Price is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Stock is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "ImageUrl is required" }])
                )
                done()
            })
    })

    it('GET All response with 200 status code', function (done) {
        //setup
        const body = {}
        //execute
        request(app)
            .get('/contents')
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body[0]).toHaveProperty('id')
                expect(typeof res.body[0].id).toEqual('number')
                params = res.body[0].id
                expect(res.body[0]).toHaveProperty('id')
                expect(res.body[0]).toHaveProperty('name')
                expect(res.body[0]).toHaveProperty('category')
                expect(res.body[0]).toHaveProperty('stock')
                expect(res.body[0]).toHaveProperty('price')
                expect(res.body[0]).toHaveProperty('imageUrl')

                done()
            })
    })

    it('GET All response with 500 status code', function (done) {
        //setup
        const body = {

        }
        //execute
        request(app)
            .post('/contents')
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(500)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')

                done()
            })
    })

    it('GET One response with 200 status code', function (done) {
        //setup
        const body = {}
        //execute
        request(app)
            .get(`/contents/${+params}`)
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('category')
                expect(res.body).toHaveProperty('stock')
                expect(res.body).toHaveProperty('price')
                expect(res.body).toHaveProperty('imageUrl')

                done()
            })
    })

    it('PUT response with 200 status code', function (done) {
        //setup
        const body = {
            name: "Sepatu Nike",
            category: "fashion",
            price: 300000,
            stock: 50,
            imageUrl: "https://unsplash.com"
        }
        //execute
        request(app)
            .put(`/contents/${+params}`)
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                done()
            })
    })

    it('PUT response with 400 status code', function (done) {
        //setup
        const body = {
            name: "",
            category: "",
            stock: "",
            price: "",
            imageUrl: ""
        }
        //execute
        request(app)
            .put(`/contents/${+params}`)
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errorMessage')
                expect(Array.isArray(res.body.errorMessage)).toEqual(true)
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Name is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Category is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Price is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Stock is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "ImageUrl is required" }])
                )
                done()
            })
    })

    it('DELETE response with 200 status code', function (done) {
        //setup
        const body = {
        }
        //execute
        request(app)
            .delete(`/contents/${+params}`)
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                done()
            })
    })

    it('ACCESS response with 500 status code, Wrong path', function (done) {
        //setup
        const body = {
            email: process.env.EMAIL,
            password: "aaaaa"
        }
        //execute
        request(app)
            .put(`/mycontent`)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(500)
                expect(typeof res.body).toEqual('object')
                done()
            })
    })

    it('LOGIN response with 401 status code Wrong Password', function (done) {
        //setup
        const body = {
            email: process.env.EMAIL,
            password: "aaaaa"
        }
        //execute
        request(app)
            .post(`/login`)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                models.sequelize.close()
                done()
            })
    })
})

