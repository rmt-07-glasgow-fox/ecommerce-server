const request = require('supertest')
const express = require('express');
const app = express();

let body = {}
describe ('POST /products', function() {

      it("should send response with 201 status code", function(done) {

      body = {
            name: "Sepatu Adidas",
            image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
            price: 100.3,
            stock: 30
      }

      request(app)
            .post('/products')
            .send(body)
            .end(function(err, res){
                  if(err) done(err)

            


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

      it("should send response with status code 400", function(done){
            const body = {
                  name: "",
                  image_url: "",
                  price: "",
                  stock: ""
            }  

            request(app)
            .post('/products')
            .send(body)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.statusCode).toEqual(400)
                  expect(res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors).toEqual(
                        expect.arrayContaining({ 
                              errors: [
                                    'title is required',
                                    'image_url is required',
                                    'price is required',
                                    'stock is required',
                                    'price cannot be lower than 0',
                                    'stock cannot be lower than 0',
                              ] 
                        })
                  )

 
            done()
            })
      })

})

describe ('GET /products', function() {
      it("should send response with 200 status code", function(done) {

      const body = {
            name: "Sepatu Adidas",
            image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
            price: 100.3,
            stock: 30
      }

      request(app)
            .get('/products')
            .send(body)
            .end(function(err, res){
                  if(err) done(err)

            


            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('id')
            expect(typeof res.body.id).toEqual('number')
            expect(res.body).toHaveProperty('name')
            expect(typeof res.body.name).toEqual('string')
            expect(res.body).toHaveProperty('image_url')
            expect(typeof res.body.image_url).toEqual('string')
            expect(res.body).toHaveProperty('price')
            expect(typeof res.body.price).toEqual('double')
            expect(res.body).toHaveProperty('stock')
            expect(typeof res.body.stock).toEqual('number')
 
            done()
            })

      })

      it("should send response with status code 400", function(done){
            const body = {
                  name: "",
                  image_url: "",
                  price: "",
                  stock: ""
            }  

            request(app)
            .post('/products')
            .send(body)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.statusCode).toEqual(400)
                  expect(res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors).toEqual(
                        expect.arrayContaining({ 
                              errors: [
                                    'title is required',
                                    'image_url is required',
                                    'price is required',
                                    'stock is required',
                                    'price cannot be lower than 0',
                                    'stock cannot be lower than 0',
                              ] 
                        })
                  )

 
            done()
            })
      })

})