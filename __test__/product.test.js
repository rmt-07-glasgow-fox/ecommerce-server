const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let access_token_admin
let access_token_customer

beforeAll((done) => {
    User.findOne({
        where: {
            email: 'admin@mail.com'
        }
    })
    .then(data => {
    const payload = {
        id: data.id,
        email: data.email,
        role: data.role
    }

    access_token_admin = generateToken(payload)
    console.log(access_token_admin, '<< token admin')

    return User.findOne({
        where: {
            email: 'customer@mail.com',
        }
    })
        .then(data => {
            const payload = {
                id: data.id,
                email: data.email,
                role: data.role
            }
            
            access_token_customer = generateToken(payload)
            done()
        })
    })
    .catch(err => {
        // console.log('masuk ke error');
        done(err)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})


let validProduct = {
    name: 'HP OMEN 15-DC0036TX',
    image_url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-2468629/hp_hp-omen-15-dc0036tx_full07.jpg',
    price: 17000000,
    stock: 18
}

//create product
describe('POST /product success', () => {
    test('Create product success', (done) => {
        request(app)
        .post('/product')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(validProduct)
        .then(response => {
            const {body, status} = response
            expect(status).toBe(201)
            expect(body).toHavePropery('id', expect.any(Number))
            expect(body).toHavePropery('name', validProduct.name)
            expect(body).toHavePropery('image_url', validProduct.image_url)
            expect(body).toHavePropery('price', validProduct.price)
            expect(body).toHavePropery('stock', validProduct.stock)
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    test('Create product failed, not admin access_token', (done) => {
        request(app)
        .post('/product')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(validProduct)
        .then(response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    test('Create product failed, field required is empty', (done) => {
        request(app)
        .post('/product')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(validProduct)
        .then(response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})