const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models')
const { hashPassword } = require('../helpers/bcryptjs')
const { generateAccessToken } = require('../helpers/jsonwebtoken')
let id
const admin_token = generateAccessToken({ id: 1, email: 'admin@mail.com', role: 'admin' })
const customer_token = generateAccessToken({ id: 2, email: 'customer@mail.com', role: 'customer' })
const wrong_token = 'this is wrong access token'

beforeAll(done => {
    sequelize.queryInterface.bulkInsert('Products', [
        {
            name: 'Moondrop Blessing',
            price: 3700000,
            image_url: 'https://source.unsplash.com/random',
            stock: 8,
            CategoryId: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Keyboard Logitech K380',
            price: 43000,
            image_url: 'https://source.unsplash.com/random',
            stock: 99,
            CategoryId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {})
    .then(data => {
        return sequelize.queryInterface.bulkInsert('Users', [
            {
                email: 'admin@mail.com',
                password: hashPassword('admin123'),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'customer@mail.com',
                password: hashPassword('customer123'),
                role: 'customer',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {})
    })
    .then(data => {
        done()
    })
    .catch(err => done(err))
})

afterAll(done => {
    sequelize.queryInterface.bulkDelete('Products', null, {})
    .then(data => {
        return sequelize.queryInterface.bulkDelete('Users', null, {})
    })
    .then(data => {
        done()
        sequelize.close()
    })
    .catch(err => {
        done(err)
    })
})

describe(`GET /products`, () => {
    test(`Success`, (done) => {
        request(app)
            .get('/products')
            .set('access_token', admin_token)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty(['products', 0, 'name'], 'Moondrop Blessing')
                id = res.body.products[0].id
                done()
            })
    })

    test(`Wrong Access Token`, (done) => {
        request(app)
            .get('/products')
            .set('access_token', wrong_token)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })
})

describe(`POST /products`, () => {
    test(`Success`, (done) => {
        request(app)
            .post('/products')
            .set('access_token', admin_token)
            .send({
                name: `Moondrop Illumination`,
                price: 11000000,
                stock: 4,
                CategoryId: 5
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty(['product', 'name'], 'Moondrop Illumination')
                done()
            })
    })

    test(`Wrong Access Token`, (done) => {
        request(app)
            .post('/products')
            .set('access_token', wrong_token)
            .send({
                name: `Moondrop Illumination`,
                price: 11000000,
                stock: 4,
                CategoryId: 5
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })

    test(`Customer Access Token`, (done) => {
        request(app)
            .post('/products')
            .set('access_token', customer_token)
            .send({
                name: `Moondrop Illumination`,
                price: 11000000,
                stock: 4,
                CategoryId: 5
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', "You're Unauthorized To Do This")
                done()
            })
    })

    test(`Not using Access Token`, (done) => {
        request(app)
            .post('/products')
            .send({
                name: `Moondrop Illumination`,
                price: 11000000,
                stock: 4,
                CategoryId: 5
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })

    test(`Don't have product name`, (done) => {
        request(app)
            .post('/products')
            .set('access_token', admin_token)
            .send({
                price: 11000000,
                stock: 4,
                CategoryId: 5
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message', 'Product Name is Required')
                done()
            })
    })

    test(`Negative stock input`, (done) => {
        request(app)
            .post('/products')
            .set('access_token', admin_token)
            .send({
                name: `Moondrop Illumination`,
                price: 11000000,
                stock: -4,
                CategoryId: 5
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message', 'Minimum Stock is 0')
                done()
            })
    })

    test(`Negative price input`, (done) => {
        request(app)
            .post('/products')
            .set('access_token', admin_token)
            .send({
                name: `Moondrop Illumination`,
                price: -11000000,
                stock: 4,
                CategoryId: 5
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message', 'Minimum Price is Rp. 1,-')
                done()
            })
    })

    test(`Invalid type data input`, (done) => {
        request(app)
            .post('/products')
            .set('access_token', admin_token)
            .send({
                name: `Moondrop Illumination`,
                price: `Wrong Price`,
                stock: `Wrong Stock`,
                CategoryId: 5
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message', 'Price Must Be a Number, Stock Must Be a Number')
                done()
            })
    })
})

describe(`PUT /products/:id`, () => {
    test(`Success`, (done) => {
        request(app)
            .put(`/products/${id}`)
            .set('access_token', admin_token)
            .send({
                name: `Moondrop A8`,
                price: 10500000
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty(['product', 'name'], 'Moondrop A8')
                done()
            })
    })

    test(`Wrong Access Token`, (done) => {
        request(app)
            .put(`/products/${id}`)
            .set('access_token', wrong_token)
            .send({
                name: `Moondrop A8`,
                price: 10500000
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })

    test(`Not using Access Token`, (done) => {
        request(app)
            .put(`/products/${id}`)
            .send({
                name: `Moondrop A8`,
                price: 10500000
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })

    test(`Customer Access Token`, (done) => {
      request(app)
          .put(`/products/${id}`)
          .set('access_token', customer_token)
          .send({
                name: `Moondrop A8`,
                price: 10500000
            })
          .end((err, res) => {
              if (err) return done(err)
              expect(res.status).toBe(401)
              expect(res.body).toHaveProperty('message', "You're Unauthorized To Do This")
              done()
          })
    })

    test(`Negative stock input`, (done) => {
        request(app)
            .put(`/products/${id}`)
            .set('access_token', admin_token)
            .send({
                stock: -4
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message', 'Minimum Stock is 0')
                done()
            })
    })

    test(`Minus price input`, (done) => {
        request(app)
            .put(`/products/${id}`)
            .set('access_token', admin_token)
            .send({
                price: -10500000
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message', 'Minimum Price is Rp. 1,-')
                done()
            })
    })

    test(`Invalid type data input`, (done) => {
        request(app)
            .put(`/products/${id}`)
            .set('access_token', admin_token)
            .send({
                price: `Wrong Price`,
                stock: `Wrong Stock`
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message', 'Price Must Be a Number, Stock Must Be a Number')
                done()
            })
    })
})

describe(`DELETE /products/:id`, () => {
    test(`Success`, (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', admin_token)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('message', 'Product is Deleted')
                done()
            })
    })
    test(`Wrong Access Token`, (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', wrong_token)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })

    test(`Login Using Customer`, (done) => {
        request(app)
            .delete(`/products/${Number(id) + 1}`)
            .set('access_token', customer_token)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', "You're Unauthorized To Do This")
                done()
            })
    })

    test(`Not using Access Token`, (done) => {
        request(app)
            .delete(`/products/${Number(id) + 1}`)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', "Please Login First")
                done()
            })
    })
})