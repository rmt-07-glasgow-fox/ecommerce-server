const { afterAll } = require('@jest/globals')
const request = require('supertest')
let token = ''

//login
describe ('POST /login', function() {
      beforeAll(function(done){
            let token = login()
            done()
      })

      afterAll(function(done){
            clearTodos()
               .then(function(){
                     module.sequelize.close()
                     done()
               })
      })
      it("should send response with 200 status code", function(done) {

      const body = {
            email: "tes@mail.com",
            password: "qweqwe",
      }

      request(app)
            .post('/login')
            .send(body)
            .end(function(err, res){
                  if(err) done(err)


            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('access_token')
            expect(typeof res.body.id).toEqual('string')
 
            done()
            })

      })

      it("should send response with status code 400", function(done){
            const body = {
                  email: "",
                  password: "",
 
            }  

            request(app)
            .post('/login')
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
                                    'email is required',
                                    'password is required',
                                    'email must be email format',
                                    'password at least have 6 characters',
                                    'invalid email or password'
                              ] 
                        })
                  )

            done()
            })
      })

})

// describe ('POST /products', function() {
//       beforeAll(function(){
//             token = login()
//       })

//       afterAll
//       it("should send response with 201 status code", function(done) {

//       const body = {
//             name: "Sepatu Adidas",
//             image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
//             price: 100.3,
//             stock: 30
//       }

//       request(app)
//             .post('/products')
//             .send(body)
//             .end(function(err, res){
//                   if(err) done(err)

            


//             expect(res.statusCode).toEqual(201)
//             expect(typeof res.body).toEqual('object')
//             expect(res.body).toHaveProperty('id')
//             expect(typeof res.body.id).toEqual('number')
//             expect(res.body).toHaveProperty('name')
//             expect(typeof res.body.name).toEqual('string')
//             expect(res.body).toHaveProperty('image_url')
//             expect(typeof res.body.image_url).toEqual('string')
//             expect(res.body).toHaveProperty('price')
//             expect(typeof res.body.price).toEqual('double')
//             expect(res.body).toHaveProperty('stock')
//             expect(typeof res.body.stock).toEqual('number')
 
//             done()
//             })

//       })

//       it("should send response with status code 400", function(done){
//             const body = {
//                   name: "",
//                   image_url: "",
//                   price: "",
//                   stock: ""
//             }  

//             request(app)
//             .post('/products')
//             .send(body)
//             .end(function(err, res){
//                   if(err) done(err)


//                   expect(res.statusCode).toEqual(400)
//                   expect(res.body).toEqual('object')
//                   expect(res.body).toHaveProperty('errors')
//                   expect(Array.isArray(res.body.errors)).toEqual(true)
//                   expect(res.body.errors).toEqual(
//                         expect.arrayContaining({ 
//                               errors: [
//                                     'title is required',
//                                     'image_url is required',
//                                     'price is required',
//                                     'stock is required',
//                                     'price cannot be lower than 0',
//                                     'stock cannot be lower than 0',
//                               ] 
//                         })
//                   )

 
//             done()
//             })
//       })

// })

// describe ('GET /products', function() {
//       it("should send response with 200 status code", function(done) {

//       const body = {
//             name: "Sepatu Adidas",
//             image_url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg",
//             price: 100.3,
//             stock: 30
//       }

//       request(app)
//             .get('/products')
//             .send(body)
//             .end(function(err, res){
//                   if(err) done(err)

            


//             expect(res.statusCode).toEqual(200)
//             expect(typeof res.body).toEqual('object')
//             expect(res.body).toHaveProperty('id')
//             expect(typeof res.body.id).toEqual('number')
//             expect(res.body).toHaveProperty('name')
//             expect(typeof res.body.name).toEqual('string')
//             expect(res.body).toHaveProperty('image_url')
//             expect(typeof res.body.image_url).toEqual('string')
//             expect(res.body).toHaveProperty('price')
//             expect(typeof res.body.price).toEqual('double')
//             expect(res.body).toHaveProperty('stock')
//             expect(typeof res.body.stock).toEqual('number')
 
//             done()
//             })

//       })

//       it("should send response with status code 400", function(done){
//             const body = {
//                   name: "",
//                   image_url: "",
//                   price: "",
//                   stock: ""
//             }  

//             request(app)
//             .post('/products')
//             .send(body)
//             .end(function(err, res){
//                   if(err) done(err)


//                   expect(res.statusCode).toEqual(400)
//                   expect(res.body).toEqual('object')
//                   expect(res.body).toHaveProperty('errors')
//                   expect(Array.isArray(res.body.errors)).toEqual(true)
//                   expect(res.body.errors).toEqual(
//                         expect.arrayContaining({ 
//                               errors: [
//                                     'title is required',
//                                     'image_url is required',
//                                     'price is required',
//                                     'stock is required',
//                                     'price cannot be lower than 0',
//                                     'stock cannot be lower than 0',
//                               ] 
//                         })
//                   )

 
//             done()
//             })
//       })

// })