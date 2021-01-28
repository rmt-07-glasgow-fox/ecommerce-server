const request = require("supertest")
const app = require("../../app")
const {clearProducts} = require("../helpers/clear")
const models = require("../../models")
const {User} = require("../../models")
const {generateToken} = require("../../helpers/jwt")

let access_token_admin = null
let access_token_customer = null

describe('POST /products', () => {
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
            done()
        })
    })
    
    afterAll((done) => {
        clearProducts()
        .then(() => {
        models.sequelize.close()
        done()
        })
        .catch(err => console.log(err))
    })

    it('should send response with 201 status code', (done) => {
        const body = {
            name: 'Cosrx Advanced Snail Peptide Eye Cream',
            imageUrl: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            category: 'essence',
            price: 394700,
            stock: 12
        };

        request(app)
        .post('/products')
        .send(body)
        .set('access_token', access_token_admin)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(201);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('id');
            expect(typeof res.body.id).toEqual('number');
            expect(res.body).toHaveProperty('name');
            expect(res.body.name).toEqual(body.name);
            expect(res.body).toHaveProperty('imageUrl');
            expect(res.body.imageUrl).toEqual(body.imageUrl);
            expect(res.body).toHaveProperty('price');
            expect(res.body.price).toEqual(body.price);
            expect(res.body).toHaveProperty('stock');
            expect(res.body.stock).toEqual(body.stock);

            done()
        })

    })

    it('should send response with 401 status code when does not have access_token', (done) => {
        const body = {
            name: 'Cosrx Advanced Snail Peptide Eye Cream',
            imageUrl: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            category: 'essence',
            price: 394700,
            stock: 12
        };

        request(app)
        .post('/products')
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
            imageUrl: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            category: 'essence',
            price: 394700,
            stock: 12
        };

        request(app)
        .post('/products')
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
            imageUrl: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            category: 'essence',
            price: 394700,
            stock: 12
        };

        request(app)
        .post('/products')
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
            imageUrl: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            category: 'essence',
            price: -394700,
            stock: 12
        };

        request(app)
        .post('/products')
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
            imageUrl: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            category: 'essence',
            price: 394700,
            stock: -12
        };

        request(app)
        .post('/products')
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
            imageUrl: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            category: 'essence',
            price: "abc",
            stock: 12
        };

        request(app)
        .post('/products')
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
            imageUrl: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            category: 'essence',
            price: 394700,
            stock: "abc"
        };

        request(app)
        .post('/products')
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