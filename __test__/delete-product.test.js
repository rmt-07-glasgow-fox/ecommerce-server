const request = require("supertest")
const app = require("../app")
const {clearProducts} = require("./helpers/clear")
const models = require("../models")
const {User, Product} = require("../models")
const {generateToken} = require("../helpers/jwt")

let access_token_admin = null
let access_token_customer = null
let productTest = null

describe('DELETE /products/:id', () => {
    beforeAll((done) => {
        User.findOne({where: {email: 'admin@mail.com'}})
        .then(user => {
            const {id, email} = user
            access_token_admin = generateToken({id, email})
            return User.findOne({where: {email: 'akira@mail.com'}})
        })
        .then(user => {
            const {id, email} = user
            access_token_customer = generateToken({id, email})
            const inputProduct = {
                name: "shampoo",
                image_url: "test.com",
                price: 135000,
                stock: 20
            }
            return Product.create(inputProduct)
        })
        .then(product => {
            productTest = product
            done()
        })
        .catch(err => console.log(err))
    })
    
    afterAll((done) => {
        clearProducts()
        .then(() => {
        models.sequelize.close()
        done()
        })
        .catch(err => console.log(err))
    })

    it('should send response with 200 status code', (done) => {
        request(app)
        .delete(`/products/${productTest.id}`)
        .set('access_token', access_token_admin)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual("delete product successfull");

            done()
        })

    })

    it('should send response with 401 status code when does not have access_token', (done) => {
        request(app)
        .put(`/products/${productTest.id}`)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Access Denied! Please login first')
 
            done()
        })

    })

    it('should send response with 401 status code with invalid token', (done) => {
        request(app)
        .put(`/products/${productTest.id}`)
        .set('access_token', access_token_customer)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Access Denied! Please login first')
 
            done()
        })

    })

})