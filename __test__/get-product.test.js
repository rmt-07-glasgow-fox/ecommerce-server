const request = require('supertest')
const app = require('../app')
const {User} = require('../models/')
const {genToken} = require('../helpers/jwt')
const clearProduct = require('../helpers/clear-products')
const models = require('../models/')

describe('GET /products', function(){
    let access_token
    beforeAll((done)=>{
       User.findOne({where: {email: 'admin@mail.com'}})
       .then(data =>{
           let payload = {
               id: data.id,
               email: data.email
           }
           access_token = genToken(payload)
           //models.sequelize.close()
           done()
       })
    })
    

    it('should send response 200 status code', function(done){
        request(app)
        .get('/products')
        .set('access_token', `${access_token}`)
        .end(function (err, res){
            if(err) done(err)

            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            if(res.body.lentgh > 0){
                res.body.map(product =>{
                    expect(product).toHaveProperty('id')
                    expect(product).toHaveProperty('name')
                    expect(product).toHaveProperty('image_url')
                    expect(product).toHaveProperty('price')
                    expect(product).toHaveProperty('stock')
                })
            }
            done()
        })
    })

    it('should send response 200 status code', function(done){
        request(app)
        .get('/products')
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