const request = require('supertest')
const app = require('../app')

describe('GET /products', ()=> {
    it('should send response with 200 status code', (done) => {
        request(app)
            .get('/products')
            .end((err, res) => {
                if (err) done(err)

                // console.log(res)
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')

                done()
            })
    })
})