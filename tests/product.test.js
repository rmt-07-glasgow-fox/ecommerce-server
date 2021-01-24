const request = require('supertest')
const app = require('../app')
const { genToken } = require('../helpers/jwt')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token_admin
let access_token_user
let newProduct

beforeAll((done) => {
    User.findOne({where: {email: 'admin@mail.com'}})
    .then(admin => {
        let {id, email, role} = admin
        access_token_admin = genToken({id, email, role})
        return User.findOne({where: {email: 'user@mail.com'}})
    })
    .then(user => {
        let {id, email, role} = user
        access_token_user = genToken({id, email, role})
        return Product.create({
            name: 'lolipop',
            image_url: 'google.com',
            price: 1000,
            stock: 100
        })
    })
    .then(data => {
        newProduct = {
            id: data.id,
            name: data.name,
            image_url: data.image_url,
            price: data.price,
            stock: data.stock
        }
        done()
    })
    .catch(err => done(err))
})

afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(() => done())
    .catch(err => done(err))
})

describe('test product', () => {
// <<<<<<<<<<<<TEST CASE SUCCES>>>>>>>>>>>>>>>>
    describe('test case success', () => {
        test('POST /products success', (done) => {
            let obj = {
                name: 'aqua',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/9/16/6384951e-01ca-48f9-9de5-1d3902647017.jpg',
                price: 500,
                stock: 40
            }
            request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set('access_token', access_token_admin)
            .send(obj)
            .then(response => {
                const {body, status} = response

                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', obj.name)
                expect(body).toHaveProperty('image_url', obj.image_url)
                expect(body).toHaveProperty('price', obj.price)
                expect(body).toHaveProperty('stock', obj.stock)
                done()
            })
            .catch(err => done(err))
        })
        test('PUT /products/:id success', (done) => {
            let obj = {
                name: 'jam',
                image_url: 'google.com',
                price: 10000000,
                stock: 1
            }

            request(app)
            .put(`/products/${newProduct.id}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token_admin)
            .send(obj)
            .then(response => {
                const {body, status} = response

                expect(status).toBe(200)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', obj.name)
                expect(body).toHaveProperty('image_url', obj.image_url)
                expect(body).toHaveProperty('price', obj.price)
                expect(body).toHaveProperty('stock', obj.stock)
                done()
            })
            .catch(err => done(err))
        })
        test('DELETE /products/:id success', (done) => {
            request(app)
            .delete(`/products/${newProduct.id}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token_admin)
            .then(response => {
                const {body, status} = response

                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'product success to delete')
                done()
            })
            .catch(err => done(err))
        })
    })

// <<<<<<<<<<<<TEST CASE FAIL>>>>>>>>>>>>>>>>
    describe('test case fail', () => {
        // <<<<<<<<<<<POST>>>>>>>>>>>>>
        test('POST /products no token', (done) => {
            let obj = {
                name: 'aqua',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/9/16/6384951e-01ca-48f9-9de5-1d3902647017.jpg',
                price: 500,
                stock: 40
            }
            request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .send(obj)
            .then(response => {
                const {body, status} = response

                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'please login first')
                done()
            })
            .catch(err => done(err))
        })
        test('POST /products no admin token', (done) => {
            let obj = {
                name: 'aqua',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/9/16/6384951e-01ca-48f9-9de5-1d3902647017.jpg',
                price: 500,
                stock: 40
            }
            request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set('access_token', access_token_user)
            .send(obj)
            .then(response => {
                const {body, status} = response

                expect(status).toBe(403)
                expect(body).toHaveProperty('message', 'only admin can access')
                done()
            })
            .catch(err => done(err))
        })
        // <<<<<<<<<<<<<<PUT>>>>>>>>>>>>>>
        test('PUT /products/:id no token', (done) => {
            let obj = {
                name: 'aqua',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/9/16/6384951e-01ca-48f9-9de5-1d3902647017.jpg',
                price: 500,
                stock: 40
            }
            request(app)
            .put(`/products/${newProduct.id}`)
            .set('Accept', 'application/json')
            .send(obj)
            .then(response => {
                const {body, status} = response

                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'please login first')
                done()
            })
            .catch(err => done(err))
        })
        test('PUT /products/:id no admin token', (done) => {
            let obj = {
                name: 'aqua',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/9/16/6384951e-01ca-48f9-9de5-1d3902647017.jpg',
                price: 500,
                stock: 40
            }
            request(app)
            .put(`/products/${newProduct.id}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token_user)
            .send(obj)
            .then(response => {
                const {body, status} = response

                expect(status).toBe(403)
                expect(body).toHaveProperty('message', 'only admin can access')
                done()
            })
            .catch(err => done(err))
        })
        // <<<<<<<<<<<<<<DELETE>>>>>>>>>>>>>>
        test('DELETE /products/:id no token', (done) => {
            let obj = {
                name: 'aqua',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/9/16/6384951e-01ca-48f9-9de5-1d3902647017.jpg',
                price: 500,
                stock: 40
            }
            request(app)
            .delete(`/products/${newProduct.id}`)
            .set('Accept', 'application/json')
            .send(obj)
            .then(response => {
                const {body, status} = response

                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'please login first')
                done()
            })
            .catch(err => done(err))
        })
        test('DELETE /products/:id no admin token', (done) => {
            let obj = {
                name: 'aqua',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/9/16/6384951e-01ca-48f9-9de5-1d3902647017.jpg',
                price: 500,
                stock: 40
            }
            request(app)
            .delete(`/products/${newProduct.id}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token_user)
            .send(obj)
            .then(response => {
                const {body, status} = response

                expect(status).toBe(403)
                expect(body).toHaveProperty('message', 'only admin can access')
                done()
            })
            .catch(err => done(err))
        })
    })
})