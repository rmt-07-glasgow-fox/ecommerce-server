const request = require('supertest')
const app = require('../../app')

describe('GET /materials/category/:category', () => {
    let token = null

    beforeAll((done) => {
        const user = {
            email: 'admin@gmail.com',
            password: 'admin123'
        }

        request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                token = res.body.access_token
                done()
            })
    })

    // success case
    it('should send response 200', (done) => {
        request(app)
            .get('/materials/category/steel')
            .set('access_token', token)
            .end((err, res) => {
                if(err) done(err)

                // assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('name')
                expect(typeof res.body.name).toEqual('string')
                expect(res.body).toHaveProperty('image_url')
                expect(typeof res.body.image_url).toEqual('string')
                expect(res.body).toHaveProperty('category')
                expect(typeof res.body.category).toEqual('string')
                expect(res.body).toHaveProperty('price')
                expect(typeof res.body.price).toEqual('number')
                expect(res.body).toHaveProperty('stock')
                expect(typeof res.body.stock).toEqual('number')

                done()
            })
    })

    // error case ketika tidak ada akses token
    it('should send response 500', (done) => {
        request(app)
            .get('/materials/category/steel')
            .end((err, res) => {
                if (err) done(err)

                // assert
                expect(res.statusCode).toEqual(500)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('jwt must be provided')

                done()
            })
    })

    // salah mengirim params atau category tidak ada di dalam db
    it('should send response 200', (done) => {
        request(app)
            .get('/materials/category/kain')
            .set('access_token', token)
            .end((err, res) => {
                if(err) done(err)

                expect(res.statusCode).toEqual(200)
                expect(res.body).toEqual(null)

                done()
            })
    })
})