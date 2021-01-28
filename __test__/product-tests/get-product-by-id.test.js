const request = require("supertest")
const app = require("../../app")
const {clearProducts} = require("../helpers/clear")
const models = require("../../models")
const {User, Product} = require("../../models")
const {generateToken} = require("../../helpers/jwt")

let access_token_admin = null
let access_token_customer = null
let productTest = null

describe('GET /products/:id', () => {
    beforeAll((done) => {
        User.findOne({where: {email: 'admin@mail.com'}})
        .then(user => {
            const {id, email, role} = user
            access_token_admin = generateToken({id, email, role})
            return User.findOne({where: {email: 'akira@mail.com'}})
        })
        .then(user => {
            const {id, email, role} = user
            access_token_customer = generateToken({id, email, role})
            const inputProduct = {
                name: "shampoo",
                imageUrl: "test.com",
                category: 'essence',
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
        .get(`/products/${productTest.id}`)
        .set('access_token', access_token_admin)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty("id");
            expect(typeof res.body.id).toEqual("number")
            expect(res.body).toHaveProperty("name");
            expect(typeof res.body.name).toEqual("string")
            expect(res.body).toHaveProperty("imageUrl");
            expect(typeof res.body.imageUrl).toEqual("string")
            expect(res.body).toHaveProperty("category");
            expect(typeof res.body.category).toEqual("string")
            expect(res.body).toHaveProperty("price");
            expect(typeof res.body.price).toEqual("number")
            expect(res.body).toHaveProperty("stock");
            expect(typeof res.body.stock).toEqual("number")

            done()
        })

    })

    it('should send response with 401 status code when does not have access_token', (done) => {
        request(app)
        .get(`/products/${productTest.id}`)
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
        .get(`/products/${productTest.id}`)
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