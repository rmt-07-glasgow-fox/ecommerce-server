const request = require("supertest")

const app = require('../app')
const clearProducts = require('./helpers/clear-products')
const models = require('../models')

const { User, Product } = require('../models')
const { generateToken } = require("../helpers/jwt")

const bukanadminbiasa = {
    id:100,
    email: 'bukanadminbiasa@mail.com',
    role: 'customer'
}
let access_token
let access_token2 = generateToken(bukanadminbiasa)

let objProductId

beforeAll(done => {
    User.findOne({
        where: {
            email: 'admin@mail.com'
        }
    })
    .then(data => {
        access_token = generateToken ({
            id: data.id,
            email: data.email,
            role: data.role
        })
        const productTest = {
            name: 'Hanayo Koizumi Poster',
            image_url: 'https://static.zerochan.net/Koizumi.Hanayo.full.2349510.jpg',
            price: 50000,
            stock:  999,
            UserId: data.id
        }
        return Product.create(productTest)
    })
    .then(product => {
        objProductId = product.id
        done()
    })
    .catch(err => {
        done()
    })
})

describe('DELETE/products/:id', function() {
    afterAll(function(done) {
        clearProducts()
        .then(() => {
            models.sequelize.close()
            done()
        }).catch(console.log())
    })

    it('should send response with 200 status code', function (done) {
        //Setup
        //Execute
        request(app)
            .delete(`/products/${objProductId}`)
            .set('access_token', access_token)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('msg')
                expect(typeof res.body.msg).toEqual('string')

                done()
            })
    })


    it('should send response with 401 status code when no access code', function (done) {
        //Setup
        //Execute
        request(app)
            .delete(`/products/${objProductId}`)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message))

                done()
            })
    })

    it('should send response with 401 status code when login not as admin', function (done) {
        //Setup
        //Execute
        request(app)
            .delete(`/products/${objProductId}`)
            .set('access_token', access_token2)
            .end(function(err, res) {
                //error supertest
                if (err) done(err)

                //Assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(Array.isArray(res.body.message))

                done()
            })
    })
})