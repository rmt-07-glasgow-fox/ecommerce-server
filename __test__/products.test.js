const request = require('supertest')
const app = require('../app')
const { User, Product } = require('../models')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')


let access_token
let access_token2
let productId

beforeAll((done) => {

    const user1 = {
        email: 'admin2@mail.com',
        password: '1234',
        role: 'admin'
    }
    const user2 = {
        email: 'admin3@mail.com',
        password: '1234',
        role: 'customer'
    }

    const product = {
        name: "Lampu",
        image_url: "https://jadistore.com/wp-content/uploads/2018/01/Lampu-Bohlam-LED-Emergency-1.jpg",
        price: 50000,
        stock: 20 
    }

    User.create(user1)
    .then(data => {
        return User.create(user2);
    })
    .then(data => {
        return User.findOne({ where: { email: user1.email } })
    })
    .then(user => {
        const payload = {
            email: user.email,
            role: user.role
        };
        access_token = generateToken(payload);
        return User.findOne({ where: { email: user2.email }})
    })
    .then(user => {
        const payload = {
            email: user.email,
            role: user.role
        };
        access_token2 = generateToken(payload);
        return Product.create(product)        
    })        
    .then(productData => {
        productId = productData.id
        done()
    })
    .catch(err => {
        console.log(err);
    });
});

// let access_token
// let productId
// let access_token_customer

// let product = {
//     name: "Lampu",
//     image_url: "https://jadistore.com/wp-content/uploads/2018/01/Lampu-Bohlam-LED-Emergency-1.jpg",
//     price: 50000,
//     stock: 20 
// }

// let admin = {
//     name: 'Farhad',
//     email: 'admin@mail.com',
//     password: '1234',
//     role: 'admin'
// }

// let customer = { 
//     name: 'Gabriel',
//     email: 'customer@mail.com',
//     password: 'qweqwe',
//     role: 'customer'
// }

// beforeAll(done => {
//     User.create(admin)
//     .then(data => {
//         access_token = generateToken({
//             id: data.id,
//             email: data.email,
//             role: data.role
//         })
//         // console.log(access_token, "Token")
//         return User.create(customer)
//     })
//     .then(data2 => {
//         access_token_customer = generateToken({
//             id: data2.id,
//             email: data2.email,
//             role: data2.role
//         })
//          return Product.create(product)        
//      })        
//      .then(productData => {
//      productId = productData.id
//           done()
//      })
//           .catch(done())
//      })

afterAll( done => {

    queryInterface.bulkDelete('Products', null, {})
        .then(data => {
            return queryInterface.bulkDelete('Users', null, {})
        })
        .then(data2 => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
})


describe('/products', () => {

    // ===== TEST POST PRODUCT ======

    describe('POST /products', () => {
        
        //TEST CASE 1 SUCCESS
        it('should send response with 201 status code', (done) => {
            //setup
            const body = {
                name: "Helm",
                image_url: "https://www.touwanishop.com/wp-content/uploads/2017/04/helm-bell-moto-3-classic-matte-gloss-blackout.jpg",
                price: 100000,
                stock: 20
            }
            //execute
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    //assert
                    expect(res.statusCode).toEqual(201)
                    expect(typeof res.body).toEqual('object')
                    expect(typeof res.body.id).toEqual('number')
                    expect(typeof res.body.price).toEqual('number')
                    expect(typeof res.body.stock).toEqual('number')
                    expect(res.body).toHaveProperty('id')
                    expect(res.body).toHaveProperty('name')
                    expect(res.body).toHaveProperty('image_url')
                    expect(res.body).toHaveProperty('price')
                    expect(res.body).toHaveProperty('stock')
                    expect(res.body.name).toEqual(body.name)
                    expect(res.body.image_url).toEqual(body.image_url)
                    expect(res.body.price).toEqual(body.price)
                    expect(res.body.stock).toEqual(body.stock)
    
                    done()
                })
        })
    
        //TEST CASE 2
    
        it('should send response with 400 status code', (done) => {
            const body = {
                name: '',
                image_url: '',
                price: 20000,
                stock: 10
            }
    
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    // console.log(res.body, "ini response dari body")
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Name is required'])
                    )
    
                    done()
                })
        })
    
        //TEST CASE 3
    
        it('should send response with 400 status code', (done) => {

            const body = {
                name: 'Helm',
                image_url: '',
                price: -2,
                stock: 20
            }
    
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Price should be a positive number'])
                    )
    
                    done()
                })
        })
    
        //TEST CASE 4
    
        it('should send response with 400 status code', (done) => {
            const body = {
                name: 'Helm',
                image_url: '',
                price: 2000,
                stock: -1
            }
    
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Stock should be a positive number'])
                    )
    
                    done()
                })
        })
    
        //TEST CASE 5
    
        it('should send response with 500 status code', (done) => {
            const body = {
                name: 'Helm',
                image_url: '',
                price: 'asd',
                stock: 1
            }
    
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(500)
                    expect(res.body.message).toEqual('Internal Server Error')
                    
                    done()
                })
        })
    
        //TEST CASE 6
    
        it('should send response with 500 status code', (done) => {
            const body = {
                name: 'Helm',
                image_url: '',
                price: 2,
                stock: 'asd'
            }
    
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(500)
                    expect(res.body.message).toEqual('Internal Server Error')
    
                    done()
                })
        })
    
        //TEST CASE 7
    
        it('should send response with 400 status code', (done) => {
            const body = {
                name: 'Helm',
                image_url: 'https://google.com',
                price: '',
                stock: 20
            }
    
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Price is required'])
                    )
    
                    done()
                })
        })
    
        //TEST CASE 8
    
        it('should send response with 400 status code', (done) => {
    
            const body = {
                name: 'Helm',
                image_url: 'https://google.com',
                price: 200000,
                stock: ''
            }
    
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Stock is required'])
                    )
    
                    done()
                })
        })
        
        //TEST CASE 9
    
        it('should send response with 403 status code', (done) => {
    
            const body = {
                name: 'Helm',
                image_url: 'https://google.com',
                price: 200000,
                stock: ''
            }
    
            request(app)
                .post('/products')
                .set('access_token', access_token2)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual("No Authorization")
    
                    done()
                })
        })
        
        //TEST CASE 10

        it('should send response with 403 status code', (done) => {
    
            const body = {
                name: 'Helm',
                image_url: 'https://google.com',
                price: 200000,
                stock: ''
            }
    
            request(app)
                .post('/products')
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual("No Authorization")
    
                    done()
                })
        })
    })

    // ===== TEST GET PRODUCT ======

    describe('GET /products', () => {

        // TEST CASE 1

        it('should send response with 200 status code', (done) => {
    
            request(app)
                .get('/products')
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")

                    done()
                })
        })

        //TEST CASE 2

        it('should send response with 403 status code', (done) => {
    
            request(app)
                .get('/products')
                .set('access_token', access_token2)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual("No Authorization")

                    done()
                })
        })

        //TEST CASE 3

        it('should send response with 500 status code', (done) => {
    
            request(app)
                .get('/products')
                .set('access_token', 'asdasdasdasd')
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(500)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual('Internal Server Error')

                    done()
                })
        })

        //TEST CASE 4

        it('should send response with 403 status code', (done) => {
    
            request(app)
                .get('/products')
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual('No Authorization')

                    done()
                })
        })
    })

    // ===== GET PRODUCT BY ID ======

    describe('GET /products/:id', () => {

        // TEST CASE 1

        it('should send response with 200 status code', (done) => {
    
            request(app)
                .get(`/products/${productId}`)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual('object')
                    expect(typeof res.body.id).toEqual('number')
                    expect(typeof res.body.price).toEqual('number')
                    expect(typeof res.body.stock).toEqual('number')
                    expect(res.body).toHaveProperty('id')
                    expect(res.body).toHaveProperty('name')
                    expect(res.body).toHaveProperty('image_url')
                    expect(res.body).toHaveProperty('price')
                    expect(res.body).toHaveProperty('stock')

                    done()
                })
        })

        //TEST CASE 2

        it('should send response with 403 status code', (done) => {
    
            request(app)
                .get(`/products/${productId}`)
                .set('access_token', access_token2)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual("No Authorization")

                    done()
                })
        })

        //TEST CASE 3

        it('should send response with 500 status code', (done) => {
    
            request(app)
                .get(`/products/${productId}`)
                .set('access_token', 'asdasdasdasd')
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(500)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual('Internal Server Error')

                    done()
                })
        })

        //TEST CASE 4

        it('should send response with 403 status code', (done) => {
    
            request(app)
                .get(`/products/${productId}`)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual('No Authorization')

                    done()
                })
        })

        it('should send response with 404 status code', (done) => {
            
            const id = 200000

            request(app)
                .get(`/products/${id}`)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(404)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual('Error data not found')

                    done()
                })
        })
    })

    // ===== TEST PUT PRODUCT ======

    describe('PUT /products/:id', () => {
        
        //TEST CASE 1 SUCCESS
        it('should send response with 200 status code', (done) => {
            //setup
            const body = {
                name: "Lampu",
                image_url: "https://www.touwanishop.com/wp-content/uploads/2017/04/helm-bell-moto-3-classic-matte-gloss-blackout.jpg",
                price: 2000,
                stock: 20
            }

            console.log(productId, '<---- PUT')

            //execute
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    //assert
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual('object')
                    expect(typeof res.body[1][0].id).toEqual('number')
                    expect(typeof res.body[1][0].price).toEqual('number')
                    expect(typeof res.body[1][0].stock).toEqual('number')
                    expect(res.body[1][0]).toHaveProperty('id')
                    expect(res.body[1][0]).toHaveProperty('name')
                    expect(res.body[1][0]).toHaveProperty('image_url')
                    expect(res.body[1][0]).toHaveProperty('price')
                    expect(res.body[1][0]).toHaveProperty('stock')
                    expect(res.body[1][0].name).toEqual(body.name)
                    expect(res.body[1][0].image_url).toEqual(body.image_url)
                    expect(res.body[1][0].price).toEqual(body.price)
                    expect(res.body[1][0].stock).toEqual(body.stock)
    
                    done()
                })
        })
    
        //TEST CASE 2
    
        it('should send response with 400 status code', (done) => {
            const body = {
                name: '',
                image_url: '',
                price: 20000,
                stock: 10
            }
    
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    // console.log(res.body, "ini response dari body")
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Name is required'])
                    )
    
                    done()
                })
        })
    
        //TEST CASE 3
    
        it('should send response with 400 status code', (done) => {
            const body = {
                name: 'Helm',
                image_url: '',
                price: -2,
                stock: 20
            }
    
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Price should be a positive number'])
                    )
    
                    done()
                })
        })
    
        //TEST CASE 4
    
        it('should send response with 400 status code', (done) => {
            const body = {
                name: 'Helm',
                image_url: '',
                price: 2000,
                stock: -1
            }
    
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Stock should be a positive number'])
                    )
    
                    done()
                })
        })
    
        //TEST CASE 5
    
        it('should send response with 500 status code', (done) => {

            const body = {
                name: 'Helm',
                image_url: '',
                price: 'asd',
                stock: 1
            }
    
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(500)
                    expect(res.body.message).toEqual('Internal Server Error')
                    
                    done()
                })
        })
    
        //TEST CASE 6
    
        it('should send response with 500 status code', (done) => {
            const body = {
                name: 'Helm',
                image_url: '',
                price: 2,
                stock: 'asd'
            }
    
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(500)
                    expect(res.body.message).toEqual('Internal Server Error')
    
                    done()
                })
        })
    
        //TEST CASE 7
    
        it('should send response with 400 status code', (done) => {
            const body = {
                name: 'Helm',
                image_url: 'https://google.com',
                price: '',
                stock: 20
            }
    
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Price is required'])
                    )
    
                    done()
                })
        })
    
        //TEST CASE 8
    
        it('should send response with 400 status code', (done) => {
    
            const body = {
                name: 'Helm',
                image_url: 'https://google.com',
                price: 200000,
                stock: ''
            }
    
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)
                    expect(res.body.errors).toEqual(
                        expect.arrayContaining(['Stock is required'])
                    )
    
                    done()
                })
        })
        
        //TEST CASE 9
    
        it('should send response with 403 status code', (done) => {
    
            const body = {
                name: 'Helm',
                image_url: 'https://google.com',
                price: 200000,
                stock: ''
            }
    
            request(app)
                .put(`/products/${productId}`)
                .set('access_token', access_token2)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual("No Authorization")
    
                    done()
                })
        })
        
        //TEST CASE 10

        it('should send response with 403 status code', (done) => {
    
            const body = {
                name: 'Helm',
                image_url: 'https://google.com',
                price: 200000,
                stock: ''
            }
    
            request(app)
                .put(`/products/${productId}`)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual("No Authorization")
    
                    done()
                })
        })

        // TEST CASE 11

        it('should send response with 404 status code', (done) => {

            const body = {
                name: 'Helm',
                image_url: 'https://google.com',
                price: 200000,
                stock: 2
            }
            
            const id = 200000

            request(app)
                .put(`/products/${id}`)
                .set('access_token', access_token)
                .send(body)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(404)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual('Error data not found')

                    done()
                })
        })
        
    })

    // ===== DELETE PRODUCT BY ID =======

    describe('DELETE /products/:id', () => {

        // TEST CASE 1
        it('should send response with 200 status code', (done) => {

            request(app)
                .delete(`/products/${productId}`)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body.message).toEqual("Delete Product success")

                    done()
                })
        })

        //TEST CASE 2

        it('should send response with 403 status code', (done) => {
    
            request(app)
                .delete(`/products/${productId}`)
                .set('access_token', access_token2)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual("No Authorization")
                    
                    done()
                })
        })

        //TEST CASE 3

        it('should send response with 403 status code', (done) => {
    
            request(app)
                .delete(`/products/${productId}`)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual("No Authorization")
                    
                    done()
                })
        })

        //TEST CASE 4

        it('should send response with 404 status code', (done) => {

            
            const id = 200000

            request(app)
                .delete(`/products/${id}`)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) done(err)
    
                    expect(res.statusCode).toEqual(404)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body.message).toEqual('Error data not found')

                    done()
                })
        })
    })
}) 


// npm test products.test.js