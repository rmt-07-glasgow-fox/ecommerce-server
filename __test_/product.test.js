const request = require('supertest')

const app = require('../app')
let access_token
let params

describe('POST /login', function () {
    it('should send respond with 200 status code', function (done) {
        const body = {
            email: 'romi@mail.com',
            password: '12345678',
            role: 'Admin'
        }
        request(app)
            .post('/login')
            .send(body)
            .end(function (err ,res) {
                if (err) done(err)   ;
                access_token = res.body.access_token
                done()
            })
    })
})

describe('GET /products', function () {
    it('should send respond with 200 status code', function (done) {
        request(app)
            .get('/products')
            .set('access_token', access_token)
            .end(function (err ,res) { 
                if (err) done(err)
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object');
                done()
            })
    });
    it('should send respond with 200 status code', function (done) {
        request(app)
            .get('/products')
            .set('access_token', access_token)
            .end(function (err ,res) { 
                if (err) done(err)
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object');
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        request(app)
            .get('/products')
            .end(function (err ,res) { 
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message', 'jwt must be provided')
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        request(app)
            .get('/products')
            .set('access_token', 'buatans')
            .end(function (err ,res) { 
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message', 'jwt malformed')
                done()
            })
    });
})

describe('POST /products', function () {
    it('should send respond with 201 status code', function (done) {
        const body = {
            name: 'Jam G-Shock DW-6900',
            description: 'Brand New In Box Garansi resmi Indonesia',
            image_url: 'https://assets.jamtangan.com/images/product/casio/GM-6900-1DR/1l.jpg',
            condition: 'New',
            price: 1099000,
            stock: 4
        }
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err);
                params = res.body.id
                expect(res.statusCode).toEqual(201);
                expect(typeof res.body).toEqual('object');
                expect(res.body.name).toEqual('Jam G-Shock DW-6900')
                expect(res.body.description).toEqual('Brand New In Box Garansi resmi Indonesia')
                expect(res.body.image_url).toEqual('https://assets.jamtangan.com/images/product/casio/GM-6900-1DR/1l.jpg')
                expect(res.body.condition).toEqual('New')
                expect(res.body.price).toEqual(1099000)
                expect(res.body.stock).toEqual(4)
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        const body = {
            name: '',
            description: '',
            image_url: '',
            condition: '',
            price: '',
            stock: 4
        }
        //EXECUTE
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(res.body.errors).toEqual([ 'Product name should have 3 - 30 Characters',
                'Product description should have minimum 4 Characters',
                'Url Image must be filled',
                'Condition must be filled' ])
                expect(Array.isArray(res.body.errors)).toEqual(true)
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        const body = {
            name: '',
            description: '',
            image_url: '',
            condition: '',
            price: -1,
            stock: 4
        }
        //EXECUTE
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual([ 'Product name should have 3 - 30 Characters',
                'Product description should have minimum 4 Characters',
                'Url Image must be filled',
                'Condition must be filled',
                'Product should have price' ])
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        const body = {
            name: '',
            description: '',
            image_url: '',
            condition: '',
            price: 1,
            stock: -4
        }
        //EXECUTE
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual([ 'Product name should have 3 - 30 Characters',
                'Product description should have minimum 4 Characters',
                'Url Image must be filled',
                'Condition must be filled',
                'Product should have stock' ])
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        const body = {
            name: '',
            description: '',
            image_url: '',
            condition: '',
            price: 0,
            stock: 0
        }
        //EXECUTE
        request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual([ 'Product name should have 3 - 30 Characters',
                'Product description should have minimum 4 Characters',
                'Url Image must be filled',
                'Condition must be filled',
                'Product should have price',
                'Product should have stock' ])
                done()
            })
    });
})

describe('GET /products/id', function () {
    it('should send respond with 200 status code', function (done) {
        request(app)
            .get(`/products/${params}`)
            .set('access_token', access_token)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body.name).toEqual('Jam G-Shock DW-6900')
                expect(res.body.description).toEqual('Brand New In Box Garansi resmi Indonesia')
                expect(res.body.image_url).toEqual('https://assets.jamtangan.com/images/product/casio/GM-6900-1DR/1l.jpg')
                expect(res.body.condition).toEqual('New')
                expect(res.body.price).toEqual(1099000)
                expect(res.body.stock).toEqual(4)
                done()
            })
    })
    it('should send respond with 400 status code', function (done) {
        request(app)
            .get(`/products/${params}`)
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message', 'jwt must be provided')
                done()
            })
    })
    it('should send respond with 400 status code', function (done) {
        request(app)
            .get(`/products/${params}`)
            .set('access_token', 'asal bikin')
            .end(function (err, res) {
                if (err) done(err)
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message', 'jwt malformed')
                done()
            })
    })
})

describe('PUT /products/id', function () {
    it('should send respond with 200 status code', function (done) {
        const body = {
            name: 'Jam G-Shock DW-6900-DV-2',
            description: 'Brand New In Box Garansi resmi Jepang',
            image_url: 'https://assets.jamtangan.com/images/product/casio/GM-6900-1DR/1l.jpg',
            condition: 'Seccond',
            price: 1199000,
            stock: 3
        }
        //EXECUTE
        console.log(params,'di delete');
        request(app)
            .put(`/products/${params}`)
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message', 'Product has been updated')
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        const body = {
            name: 'Jam G-Shock DW-6900-DV-2',
            description: 'Brand New In Box Garansi resmi Jepang',
            image_url: 'https://assets.jamtangan.com/images/product/casio/GM-6900-1DR/1l.jpg',
            condition: 'Seccond',
            price: -1199000,
            stock: 3
        }
        //EXECUTE
        console.log(params,'di delete');
        request(app)
            .put(`/products/${params}`)
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors', [ 'Product should have price' ])
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        const body = {
            name: 'Jam G-Shock DW-6900-DV-2',
            description: 'Brand New In Box Garansi resmi Jepang',
            image_url: 'https://assets.jamtangan.com/images/product/casio/GM-6900-1DR/1l.jpg',
            condition: 'Seccond',
            price: 1199000,
            stock: -3
        }
        //EXECUTE
        console.log(params,'di delete');
        request(app)
            .put(`/products/${params}`)
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors', [ 'Product should have stock' ])
                done()
            })
    });
    it('should send respond with 400 status code', function (done) {
        const body = {
            name: 'Jam G-Shock DW-6900-DV-2',
            description: 'Brand New In Box Garansi resmi Jepang',
            image_url: 'https://assets.jamtangan.com/images/product/casio/GM-6900-1DR/1l.jpg',
            condition: 'Seccond',
            price: -1199000,
            stock: 3
        }
        //EXECUTE
        console.log(params,'di delete');
        request(app)
            .put(`/products/${params}`)
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors', [ 'Product should have price' ])
                done()
            })
    });it('should send respond with 400 status code', function (done) {
        const body = {
            name: 'Jam G-Shock DW-6900-DV-2',
            description: 'Brand New In Box Garansi resmi Jepang',
            image_url: 'https://assets.jamtangan.com/images/product/casio/GM-6900-1DR/1l.jpg',
            condition: 'Seccond',
            price: 0,
            stock: 0
        }
        //EXECUTE
        console.log(params,'di delete');
        request(app)
            .put(`/products/${params}`)
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('errors', [ 'Product should have price', 'Product should have stock' ])
                done()
            })
    });
})

describe('PATCH /products/id', function () {
    it('should send respond with 200 status code', function (done) {
        const body = {
            condition: 'New'
        }
        //EXECUTE
        request(app)
            .patch(`/products/${params}`)
            .send(body)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object', 'Product has been updated');
                done()
            })
    });
    it('should send respond with 200 status code', function (done) {
        const body = {
            condition: 'New'
        }
        //EXECUTE
        request(app)
            .patch(`/products/${params}`)
            .send(body)
            .set('access_token', 'buatan')
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message', 'jwt malformed')
                done()
            })
    });
    it('should send respond with 200 status code', function (done) {
        const body = {
            condition: 'New'
        }
        //EXECUTE
        request(app)
            .patch(`/products/${params}`)
            .send(body)
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message', 'jwt must be provided')
                done()
            })
    });
})

describe('DELETE /products/id', function () {
    it('should send respond with 500 status code', function (done) {
        //EXECUTE
        request(app)
            .delete(`/products/${params}`)
            .set('access_token', 'teserror')
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message', 'jwt malformed')
                done()
            })
    });
    it('should send respond with 201 status code', function (done) {
        //EXECUTE
        request(app)
            .delete(`/products/${params}`)
            .set('access_token', access_token)
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object', 'Product has been deleted');
                done()
            })
    });
    it('should send respond with 201 status code', function (done) {
        //EXECUTE
        request(app)
            .delete(`/products/${params}`)
            .set('access_token', 'buatan')
            .end(function (err ,res) {
                if (err) done(err)   ;
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message', 'jwt malformed')
                done()
            })
    });
})
