const request = require('supertest')

describe('POST /products', () => {

    // 201
    it('Should send response 201 Status Code', (done) => {
        // setup
        const body = {
            name: 'Compass Gazelle Low Black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            price: 250_000,
            stock: 50,
            BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {

                if (err) { done(err) }
                if (!err) {
                    // assert

                    expect(res.body).toHaveProperty('id')
                    expect(res.body).toHaveProperty('name')
                    expect(res.body).toHaveProperty('image_url')
                    expect(res.body).toHaveProperty('price')
                    expect(res.body).toHaveProperty('stock')
                    expect(res.body).toHaveProperty('BrandId')

                    expect(res.statusCode).toEqual(201)
                    expect(res.body.name).toEqual(body.name)
                    expect(res.body.image_url).toEqual(body.image_url)
                    expect(res.body.price).toEqual(body.price)
                    expect(res.body.stock).toEqual(body.stock)
                    expect(res.body.BrandId).toEqual(body.BrandId)

                    done()
                }
            })
    })

    // 400
    it('Should send response 400 Status Code', (done) => {
        // setup
        let body = {
            name: '',
            image_url: '',
            price: '',
            stock: '',
            BrandId: ''
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                if (err) { done(err) }
                if (!err) {
                    // assert

                    expect(res.statusCode).toEqual(400)
                    expect(res.body).toEqual('object')

                    expect(res.body).toHaveProperty('errors')
                    expect(Array.isArray(res.body.errors)).toEqual(true)

                    done()
                }
            })
    })

})