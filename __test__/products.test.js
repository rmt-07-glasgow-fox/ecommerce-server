const request = require('supertest')

/*
Plan for products
- have name, description, img_url, price(int, double), stock

endpoints
GET /products
POST /products
PATCH /products/:id
PUT /products/:id
DELETE /products/:id

test
1. successfully input the product
2. empty name
3. price tidak kurang dari 1
4. stock minimal 0
5. need to be login and authorized to be able to CRUD
*/

//for getting all the products
// describe('GET /products', function(){
//     it('should send response 200 status code', function(done){
//         //setup

//         request(app)
//             .get('/products')
//             .
//     })
// })

//for posting product 
// describe('POST /products', function(){
//     it('should send response 201 status code', function(done){

//     }) 
// })

//if name is empty, price less than 1 and stock is less than 0 should return error
// describe('POST /products', function(){
//     it('should send response 400 status code', function(done){

//     }) 
// })


//for updating stock
// describe('PATCH /products/:id', function(){
//     it('should send response 200 status code', function(done){

//     })  
// })

//if stock is less than 0
// describe('PATCH /products/:id', function(){
//     it('should send response 400 status code', function(done){

//     })  
// })

//for updating the overall product
// describe('PUT /products/:id', function(){
//     it('should send response 200 status code', function(done){

//     })  
// })

//if name is empty and price less than 1 should return error
// describe('PUT /products/:id', function(){
//     it('should send response 400 status code', function(done){

//     })  
// })

//for deleting a product
// describe('DELETE /products/:id', function(){
//     it('should send response 200 status code', function(done){

//     })  
// })

