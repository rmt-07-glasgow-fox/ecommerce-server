const request = require('supertest')
const app = require('../app')
const {User} = require('../models/')
const {genToken} = require('../helpers/jwt')
const clearProduct = require('../helpers/clear-products')
const models = require('../models/')


describe(`PUT /products`, function (){
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

    afterAll((done)=>{
        clearProduct()
        .then(function (){
            models.sequelize.close()
            done()
        })
        .catch(console.log)
    })


    it(`should send response 200 status code`, function(done){
        let body = {
            name: 'underwear',
            image_url: 'https://media.gq.com/photos/5f316a12092046da7abdb421/master/w_2000,h_1333,c_limit/COS-regular-fit-recycled-cotton-jeans.jpg',
            price: 24000,
            stock: 4
        }

        request(app)
        .put('/products/:id')
        .set('access_token', `${access_token}`)
        .send(body)
        .end(function (err, res){
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
            expect(typeof res.body.price).toEqual('number')
            expect(res.body).toHaveProperty('stock')
            expect(typeof res.body.stock).toEqual('number')

            done()
        })
    })
})