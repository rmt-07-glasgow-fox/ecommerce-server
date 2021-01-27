const request = require('supertest')
const app = require('../app')
const {User, Product} = require('../models/')
const {genToken} = require('../helpers/jwt')
const clearProduct = require('../helpers/clear-products')
const models = require('../models/')


describe(`DELETE /products`, function(){
    let access_token
    let user
    let product 
    beforeAll((done)=>{
       User.findOne({where: {email: 'admin@mail.com'}})
       .then(data =>{
           user = data
           let obj = {
               name: `jeans`,
               image_url: `google.com`,
               price: 40000,
               stock: 4
           }
           return Product.create(obj)
       })
       .then(data =>{
            let payload = {
                id: user.id,
                email: user.email
            }
            product = data
            access_token = genToken(payload)
            //models.sequelize.close()
            done()
       })
       .catch(err =>{
           console.log(err)
       })
    })

    afterAll((done)=>{
        clearProduct()
        .then(function (){
            models.sequelize.close()
            done()
        })
        .catch(console.log)
    })


    it(`should send response 200 status code`, function(done){
        
        request(app)
        .delete(`/products/${product.id}`)
        .set('access_token', `${access_token}`)
        .end(function (err, res){
            if(err) done(err)

            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('msg')
            expect(typeof res.body.msg).toEqual('string')
            done()
        })
    })

    it('should send response 401 status code', function (done){
        request(app)
        .delete(`/products/${product.id}`)
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
        request(app)
        .delete(`/products/${product.id}`)
        .set('access_token', 'asdkasjdkasd')
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

})