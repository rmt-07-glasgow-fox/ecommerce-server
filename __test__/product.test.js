const request = require('supertest')

describe('POST /products', () => {
    it('should send response with 201 status code', (done) => {
        // Setup
        let body = {
            name: 'Kasur',
            image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            price: 20500000,
            stock: 5
        }
        // Execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                if (err) done(err)
                
                // Assert
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('name')
                expect(res.body.name).toEqual(body.name)
                expect(res.body).toHaveProperty('image_url')
                expect(res.body.image_url).toEqual(body.image_url)
                expect(res.body).toHaveProperty('price')
                expect(res.body.price).toEqual(body.price)
                expect(res.body).toHaveProperty('stock')
                expect(res.body.stock).toEqual(body.stock)

                done()
            })
    })
    it('should response with 400 status code', (done) => {
        // Setup
        let body = {
            name: '',
            image_url: '',
            price: -1,
            stock: -1
        }
        // Execute
        request(app)
            .post('/products')
            .send(body)
            .end((req, res) => {
                if(err) done(err)
                
                // Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('errors')
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Name is required', 'Image Url is required', 'Minimum price is 0', 'Minimum stock is 0'])
                )
                
                done()
            })
    })

    it('should response with 400 status code', (done) => {
        // Setup
        let body = {
            name: 'Kasur',
            image_url: 'https://images.unsplash.com/flagged/photo-1575517111839-3a3843ee7f5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            price: 'asd',
            stock: 'asd'
        }
        // Execute
        request(app)
            .post('/products')
            .send(body)
            .end((req, res) => {
                if(err) done(err)
                
                // Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                
                done()
            })
    })
})