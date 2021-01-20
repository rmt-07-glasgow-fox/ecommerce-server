const request = require('supertest')
const app = require('../app')
const { sequelize, user, product } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let access_token_admin 
let access_token_cust
let id_product

beforeAll( (done) => {
    user.findOne({
        where: {
            email: 'admin@mail.com'
        }
    })
    .then( data => {
        const payload = {
            id: data.dataValues.id,
            email: data.dataValues.email,
            role: data.dataValues.role
        }
        access_token_admin = generateToken(payload)
        return user.findOne({
            where: {
                email: 'cust@mail.com'
            }
        })
    })
    .then(data => {
        const payload = {
            id: data.id,
            email: data.email,
            role: data.role
        }
        access_token_cust = generateToken(payload)
        let inputProduct = {
            name: "Jersey MU",
            image_url: "MU.jpg",
            price: 100000,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        return product.create(inputProduct)
    })
    .then( dataProduct => {
        id_product = dataProduct.id
        done()
    })
    .catch(err => {
        done(err)
    })
})

// afterAll((done) => {
//     queryInterface.bulkDelete('products')
//       .then(() => {
//         done()
//       })
//       .catch(done)
//   })

describe( 'DELETE /product/delete/id success', ()=> {
    test('delete success', (done) => {
        request(app)
        .delete(`/product/delete/${+id_product}`)
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .then( response => {
            const {status, body} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'Product has been deleted')
            done()
        })
        .catch( err => {
            done(err)
        })
    })
})

describe( 'DELETE /product/delete/id failed', ()=> {
    test('delete failed, access_token not exist', (done) => {
        request(app)
        .delete(`/product/delete/${+id_product}`)
        .set('Accept', 'application/json')
        .then( response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Please Login First')
            done()
        })
        .catch( err => {
            done(err)
        })
    })

    test('delete failed, access_token isn\'t access token admin', (done) => {
        request(app)
        .delete(`/product/delete/${+id_product}`)
        .set('Accept', 'application/json')
        .set('access_token', access_token_cust)
        .then( response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'You don\'t have an access')
            done()
        })
        .catch( err => {
            done(err)
        })
    })
})