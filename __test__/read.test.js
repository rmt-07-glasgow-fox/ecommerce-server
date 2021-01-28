const request = require('supertest')
const app = require('../app')
const { User, Product } = require('../models')
const { clearDB, clearDBUser } = require('../helpers/clearDB')
const { generateToken } = require('../helpers/jwt')

const user = {
    email: 'test5@mail.com',
    password: '123456',
    role: 'admin'
}

const product = {
    name: "MOTOR LUCU",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxv5LHnWDg0y4iVLkDmb2OXeSzQtas_YM2eQ&usqp=CAU",
    price: 10000000000,
    stock: 1
}

let token
let id

beforeAll((done) => {
    User.create(user)
    .then(data => {
        return User.findOne({ where: { email: user.email } })
    })
    .then(data => {
        const payload = {
            email: data.email,
            role: data.role
        };
        token = generateToken(payload);
        return Product.create(product)
    })   
    .then( data => {
        id = data.id
        done()
    })
    .catch(err => {
        console.log(err);
    });
});

afterAll(function (done) {
    clearDB()
    .then( (data) => {
        return clearDBUser()
    })
    .then( (data) => {
        id = data.id
        done()
    })
    .catch( err => {
        console.log(err);
    })
})

describe('GET/products', function () {
    //TEST CASE 1
    it('should send response with 200 status code',function (done) {
        //setup

        // execute
        request(app)
            .get('/products')
            .set('access_token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                done()
            })
    })
})

describe('GET/products/id', function () {
    //TEST CASE 2
    console.log(id);
    it('should send response with 200 status code',function (done) {
        //setup

        // execute
        request(app)
            .get(`/products/${id}`)
            .set('access_token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('image_url')
                expect(res.body).toHaveProperty('price')
                expect(res.body).toHaveProperty('stock')
                expect(typeof res.body.name).toEqual('string')
                expect(typeof res.body.image_url).toEqual('string')
                expect(typeof res.body.price).toEqual('number')
                expect(typeof res.body.stock).toEqual('number')
                done()
            })
    })
})