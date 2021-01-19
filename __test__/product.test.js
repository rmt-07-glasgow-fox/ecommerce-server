const request = require('supertest')
const app = require('../app')

describe('POST /products', () => {

    it('Status Code 400 | message : access_token is required', (done) => {
        // setup
        const body = {
            name: 'compass gazelle low black',
            image_url: '/products/compass-gazelle-low-black.jpg',
            price: 200000,
            stock: 100,
            BrandId: 1
        }

        // execute
        request(app)
            .post('/products')
            .send(body)
            .end((err, res) => {
                if (err) done(err)
                // assert
                expect(res.body.message).toEqual("access_token is required")
                done()
            })
    })

})