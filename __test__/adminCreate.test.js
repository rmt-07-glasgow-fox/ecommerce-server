const request = require('supertest')
// require clearProducts here

describe('POST /products', () => {
    //add clearProducts iside beforeAll hooks here
    it('should send response with 201 status code', (done) => {
        // Setup
        const body = {
            name: 'nice headphones',
            image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
            price: 120000,
            stock: 5
        }
        // Execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                //err from supertest
                if (err) done(err)

                // Assert
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')

                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')

                expect(res.body).toHaveProperty('name')
                expect(typeof res.body.name).toEqual('string')

                expect(res.body).toHaveProperty('image_url')
                expect(typeof res.body.image_url).toEqual('string')

                expect(res.body).toHaveProperty('price')
                expect(typeof res.body.price).toEqual('number')

                expect(res.body).toHaveProperty('stock')
                expect(typeof res.body.stock).toEqual('number')

                done()

            })
    })

    it('should send response with 400 status code', (done) => {
        // Setup
        const body = {
            name: '',
            image_url: '',
            price: '',
            stock: ''
        }
        // Execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                //err from supertest
                if (err) done(err)

                // Assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty(errors)
                expect(Array.isArray(res.body.errors)).toEqual(true)
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(['Name required', 'Image_url required', 'Price required', 'Stock required'])
                )

                done()

            })
    })

})


