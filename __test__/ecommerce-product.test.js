const request = require('supertest')
const { User, Product } = require('../models')
const app = require('../app')
const { tokenGenerate } = require('../helper/jwt')

let body = {}
let dummy = {}
let access_token 
describe ('POST /products', function() {
      beforeAll(function(done){
            User.findOne({where: {id: 1}})
                .then(data => {
                      let payload = {
                            id: data.id,
                            email: data.email
                      }

                      access_token = tokenGenerate(payload)
                      done()
                }).catch(err => {
                      done(err)
                })
                
      })

      afterAll(function(done){
            Product.destroy({where: {}})
                    .then(()=> {
                          done()
                    }).catch(err => {
                          done(err)
                    })
      })
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
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


            expect(res.status).toBe(201)
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
                  name: '',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 100.3,
                  stock: 30
            }  

            request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('name is required')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "",
                  price: 100.3,
                  stock: 30
            }  

            request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('image_url is required')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: '',
                  stock: 30
            }  

            request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('price cannot be less than zero')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 2300000,
                  stock: ''
            }  

            request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('stock cannot be less than zero')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: -2300000,
                  stock: 23
            }  

            request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('price cannot be less than zero')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 2300000,
                  stock: -23
            }  

            request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('stock cannot be less than zero')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 2300000,
                  stock: -23
            }  

            request(app)
            .post('/products')
            .send(body)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(401)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('message')
                  expect(res.body.message).toEqual("you have no permission")

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 2300000,
                  stock: -23
            }  

            request(app)
            .post('/products')
            .send(body)
            .set('access_token', 'wrong access_token')
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(401)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('message')
                  expect(res.body.message).toEqual("you have no permission")

 
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
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)

            


            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
   
 
            done()
            })

      })

})


describe ('PUT /products/:id', function(){
      beforeAll(function(done){

            body = {
                  name: "dummy product",
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 100.3,
                  stock: 30
            }
        if (process.env.NODE_ENV === 'test') {
            Product.create(body)
                    .then(product => {
                          dummy = {
                                id: product.id,
                                name: product.name,
                                image_url: product.image_url,
                                price: product.price,
                          }
                          done()
                    }).catch(err => {
                          done(err)
                    })
         }
      })
      it("should send response with 200 status code", function(done) {

           let  newProduct = {
                 name: "dummy baru",
                 image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                 price: 100.3,
                 stock: 30
           }
     
           request(app)
                 .put(`/products/${dummy.id}`)
                 .send(body)
                 .set('access_token', access_token)
                 .end(function(err, res){
                       if(err) done(err)
     
     
                 expect(res.status).toBe(200)
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
                  name: '',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 100.3,
                  stock: 30
            }  

            request(app)
            .put(`/products/${dummy.id}`)
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('name is required')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: '',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 100.3,
                  stock: 30
            }  

            request(app)
            .put(`/products/${dummy.id}`)
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('name is required')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "",
                  price: 100.3,
                  stock: 30
            }  

            request(app)
            .put(`/products/${dummy.id}`)
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('image_url is required')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: '',
                  stock: 30
            }  

            request(app)
            .put(`/products/${dummy.id}`)
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('price cannot be less than zero')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 2300000,
                  stock: ''
            }  

            request(app)
            .put(`/products/${dummy.id}`)
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('stock cannot be less than zero')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: -2300000,
                  stock: 23
            }  

            request(app)
            .put(`/products/${dummy.id}`)
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('price cannot be less than zero')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 2300000,
                  stock: -23
            }  

            request(app)
            .put(`/products/${dummy.id}`)
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(400)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('errors')
                  expect(Array.isArray(res.body.errors)).toEqual(true)
                  expect(res.body.errors[0].message).toEqual('stock cannot be less than zero')

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 2300000,
                  stock: -23
            }  

            request(app)
            .put(`/products/${dummy.id}`)
            .send(body)
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(401)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('message')
                  expect(res.body.message).toEqual("you have no permission")

 
            done()
            })
      })
      it("should send response with status code 400", function(done){
            const body = {
                  name: 'Adidas',
                  image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
                  price: 2300000,
                  stock: -23
            }  

            request(app)
            .put(`/products/${dummy.id}`)
            .send(body)
            .set('access_token', 'wrong access_token')
            .end(function(err, res){
                  if(err) done(err)


                  expect(res.status).toBe(401)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('message')
                  expect(res.body.message).toEqual("you have no permission")

 
            done()
            })
      })
      
})

describe ('DELETE /products/id',function(){


      afterAll(function(done){
            Product.destroy({where: {}})
                    .then(()=> {
                          done()
                    }).catch(err => {
                          done(err)
                    })
      })
      it("should send response with 200 status code", function(done) {

      
            request(app)
                  .delete(`/products/${dummy.id}`)
                  .set('access_token', access_token)
                  .end(function(err, res){
                        if(err) done(err)
      
      
                  expect(res.status).toBe(200)
                  expect(typeof res.body).toEqual('object')
                  expect(res.body).toHaveProperty('message')
                  expect(res.body.message).toEqual('delete success')
       
                  done()
                  })
      })
      
})