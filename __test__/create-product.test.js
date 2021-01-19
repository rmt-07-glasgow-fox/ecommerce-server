const request = require("supertest")
const app = require("../app")
const {clearProducts} = require("./helpers/clear")
const models = require("../models")
const {User} = require("../models")
const {generateToken} = require("../helpers/jwt")

let token = null

describe('POST /products', () => {
    beforeAll((done) => {
        User.findOne({where: {email: 'admin@mail.com'}})
        .then(user => {
            const {id, email} = user
            token = generateToken({id, email})
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
            image_url: 'https://media.allure.com/photos/5ec403869415cc0008b788fd/1:1/w_1600%2Cc_limit/Cosrx%2520Advanced%2520Snail%2520Peptide%2520Eye%2520Cream.jpg',
            price: 394700,
            stock: 12
        };

        request(app)
        .post('/products')
        .send(body)
        .set('access_token', token)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(201);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('id');
            expect(typeof res.body.id).toEqual('number');
            expect(res.body).toHaveProperty('name');
            expect(res.body.name).toEqual(body.name);
            expect(res.body).toHaveProperty('image_url');
            expect(res.body.image_url).toEqual(body.image_url);
            expect(res.body).toHaveProperty('price');
            expect(res.body.price).toEqual(body.price);
            expect(res.body).toHaveProperty('stock');
            expect(res.body.stock).toEqual(body.stock);

            done()
        })

    })

    it('should send response with 400 status code when input is null', (done) => {
        const body = {
            email: '',
            password: ''
        };

        request(app)
        .post('/products')
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Email/Password is required')
 
            done()
        })

    })

    it('should send response with 400 status code with invalid input', (done) => {
        const body = {
            email: 'admiiin@mail.com',
            password: '123456'
        };

        request(app)
        .post('/products')
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(404);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Email/Password Invalid')
 
            done()
        })

    })

    it('should send response with 400 status code with invalid input', (done) => {
        const body = {
            email: 'admin@mail.com',
            password: '1234567'
        };

        request(app)
        .post('/products')
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(404);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Email/Password Invalid')
 
            done()
        })

    })
})