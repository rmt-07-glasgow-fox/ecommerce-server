const request = require("supertest")
const app = require("../app")
const {clearProducts} = require("./helpers/clear")
const models = require("../models")
const {User, Product} = require("../models")
const {generateToken} = require("../helpers/jwt")

let access_token_admin = null
let access_token_customer = null
let productTest = null

describe('PUT /products/:id', () => {
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
        const body = {
            name: 'Cosrx Advanced Snail Peptide Eye Cream',
            image_url: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            price: 394700,
            stock: 12
        };

        request(app)
        .put(`/products/${productTest.id}`)
        .send(body)
        .set('access_token', access_token_admin)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual("edit product successfull");

            done()
        })

    })

    it('should send response with 401 status code when does not have access_token', (done) => {
        const body = {
            name: 'Cosrx Advanced Snail Peptide Eye Cream',
            image_url: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            price: 394700,
            stock: 12
        };

        request(app)
        .put(`/products/${productTest.id}`)
        .send(body)
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
        const body = {
            name: 'Cosrx Advanced Snail Peptide Eye Cream',
            image_url: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            price: 394700,
            stock: 12
        };

        request(app)
        .put(`/products/${productTest.id}`)
        .set('access_token', access_token_customer)
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Access Denied! Please login first')
 
            done()
        })

    })

    it('should send response with 400 status code with empty name', (done) => {
        const body = {
            name: '',
            image_url: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            price: 394700,
            stock: 12
        };

        request(app)
        .put(`/products/${productTest.id}`)
        .set('access_token', access_token_admin)
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual(['name is required'])
 
            done()
        })

    })

    it('should send response with 400 status code with price in minus value', (done) => {
        const body = {
            name: 'Cosrx Advanced Snail Peptide Eye Cream',
            image_url: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            price: -394700,
            stock: 12
        };

        request(app)
        .put(`/products/${productTest.id}`)
        .set('access_token', access_token_admin)
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual(['price input is invalid'])
 
            done()
        })

    })

    it('should send response with 400 status code with stock in minus value', (done) => {
        const body = {
            name: 'Cosrx Advanced Snail Peptide Eye Cream',
            image_url: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            price: 394700,
            stock: -12
        };

        request(app)
        .put(`/products/${productTest.id}`)
        .set('access_token', access_token_admin)
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual(['stock input is invalid'])
 
            done()
        })

    })

    it('should send response with 400 status code with price in string value', (done) => {
        const body = {
            name: 'Cosrx Advanced Snail Peptide Eye Cream',
            image_url: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            price: "abc",
            stock: 12
        };

        request(app)
        .put(`/products/${productTest.id}`)
        .set('access_token', access_token_admin)
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual(['price must be number'])
 
            done()
        })

    })

    it('should send response with 400 status code with stock in string value', (done) => {
        const body = {
            name: 'Cosrx Advanced Snail Peptide Eye Cream',
            image_url: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            price: 394700,
            stock: "abc"
        };

        request(app)
        .put(`/products/${productTest.id}`)
        .set('access_token', access_token_admin)
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual(['stock must be number'])
 
            done()
        })

    })
})