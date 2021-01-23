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

const customer = {
    email: 'cus@mail.com',
    password: '123456',
    role: ''
}

const product = {
    name: "MOTOR LUCU",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxv5LHnWDg0y4iVLkDmb2OXeSzQtas_YM2eQ&usqp=CAU",
    price: 10000000000,
    stock: 1
}

let token
let token2
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
        return User.create(customer)
    })
    .then( data => {
        return User.findOne({ where: { email: customer.email } })
    }) 
    .then( data => {
         const payload = {
            email: data.email,
            role: data.role
        };
        token2 = generateToken(payload);
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

describe('DELETE/products/id', function () {
    //TEST CASE 1
    it('should send response with 200 status code',function (done) {
        //setup

        // execute
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', token)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(typeof res.body.message).toEqual('string')
                expect(res.body.message).toEqual('delete success')
                done()
            })
    })

    it('should send response with 403 status code',function (done) {
        //setup

        // execute
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', token2)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }

                //assert
                expect(res.statusCode).toEqual(403)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(typeof res.body.message).toEqual('string')
                expect(res.body.message).toEqual('You dont have permission to access this directory')
                done()
            })
    })

})
