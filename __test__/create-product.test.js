const request = require('supertest')
const app = require('../app.js')

describe('POST /products', () => {
    it('should send response with 201 status code', (done) => {
        //setup
        const body = {
            name: "The Second's Coming Gluttony Book 1",
            image_url: "https://cdn.novelupdates.com/images/2019/01/The-Second-Coming-of-Avarice.jpg",
            price: 77777,
            stock: 100,
            UserId: 1
        }
        //execute
        request(app) 
            .post('/products')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
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
                expect(res.body).toHaveProperty('UserId')
                expect(res.body.UserId).toEqual(body.UserId)
                
                done()
            } )
    })
    it('should send response with 201 status code', (done) => {
        //setup
        const body = {
            name: "The Second's Coming Gluttony Book 1",
            UserId: 1
        }
        //execute
        request(app) 
            .post('/products')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
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
                expect(res.body).toHaveProperty('UserId')
                expect(res.body.UserId).toEqual(body.UserId)
                
                done()
            } )
    })
    it('should send response with 400 status code', (done) => {
        //setup
        const body = {
            name: "",
            UserId: 1
        }
        //execute
        request(app) 
            .post('/products')
            .send(body)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Name Product cant be Empty'])
                )

                done()
            } )
    })
})