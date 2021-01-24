const request = require('supertest')
const app = require('../app')
const clearContent = require("./helpers/clearContents")
const models = require('../models')
let access_token = ""
let params = 0
let paramsBanner = 0

describe('CRUD /contents', function () {
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

    it('POST CONTENT response with 201 status code', function (done) {
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

    it('POST CONTENT response with 400 status code', function (done) {
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

    it('GET All CONTENT response with 200 status code', function (done) {
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

    it('GET All CONTENT response with 500 status code', function (done) {
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

    it('GET ONE CONTENT response with 200 status code', function (done) {
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

    it('PUT CONTENT response with 200 status code', function (done) {
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

    it('PUT CONTENT response with 400 status code', function (done) {
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

    it('DELETE CONTENT response with 200 status code', function (done) {
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
                done()
            })
    })

    it('POST BANNER response with 201 status code', function (done) {
        //setup
        const body = {
            title: "Sepatu Nike",
            status: true,
            imageUrl: "https://unsplash.com"
        }
        //execute
        request(app)
            .post('/banners')
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('title')
                expect(res.body.title).toEqual(body.title)
                expect(res.body).toHaveProperty('status')
                expect(res.body.status).toEqual(body.status)
                expect(res.body).toHaveProperty('imageUrl')
                expect(res.body.imageUrl).toEqual(body.imageUrl)
                done()
            })
    })

    it('POST BANNER response with 400 status code', function (done) {
        //setup
        const body = {
            title: "",
            status: "",
            imageUrl: ""
        }
        //execute
        request(app)
            .post('/banners')
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errorMessage')
                expect(Array.isArray(res.body.errorMessage)).toEqual(true)
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Title is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Status is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "ImageUrl is required" }])
                )
                done()
            })
    })

    it('GET All BANNER response with 200 status code', function (done) {
        //setup
        const body = {}
        //execute
        request(app)
            .get('/banners')
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body[0]).toHaveProperty('id')
                expect(typeof res.body[0].id).toEqual('number')
                paramsBanner = res.body[0].id
                expect(res.body[0]).toHaveProperty('id')
                expect(res.body[0]).toHaveProperty('title')
                expect(res.body[0]).toHaveProperty('status')
                expect(res.body[0]).toHaveProperty('imageUrl')

                done()
            })
    })

    it('GET All CONTENT response with 500 status code', function (done) {
        //setup
        const body = {
        }
        //execute
        request(app)
            .post('/banners')
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(500)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')

                done()
            })
    })

    it('GET ONE CONTENT response with 200 status code', function (done) {
        //setup
        const body = {}
        //execute
        request(app)
            .get(`/banners/${+paramsBanner}`)
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('title')
                expect(res.body).toHaveProperty('status')
                expect(res.body).toHaveProperty('imageUrl')

                done()
            })
    })

    it('PUT BANNER response with 200 status code', function (done) {
        //setup
        const body = {
            title: "Sepatu Nike",
            status: false,
            imageUrl: "https://unsplash.com"
        }
        //execute
        request(app)
            .put(`/banners/${+paramsBanner}`)
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                done()
            })
    })

    it('PUT BANNER response with 400 status code', function (done) {
        //setup
        const body = {
            title: "",
            status: "",
            imageUrl: ""
        }
        //execute
        request(app)
            .put(`/banners/${+paramsBanner}`)
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errorMessage')
                expect(Array.isArray(res.body.errorMessage)).toEqual(true)
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Title is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "Status is required" }])
                )
                expect(res.body.errorMessage).toEqual(
                    expect.arrayContaining([{ "message": "ImageUrl is required" }])
                )
                done()
            })
    })

    it('DELETE BANNER response with 200 status code', function (done) {
        //setup
        const body = {
        }
        //execute
        request(app)
            .delete(`/banners/${+paramsBanner}`)
            .set('access_token', access_token)
            .send(body)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                done()
            })
    })

    afterAll(function (done) {
        clearContent()
            .then(() => {
                models.sequelize.close()
                done()
            })
            .catch(console.log)
    })
})

