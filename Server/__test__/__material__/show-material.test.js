const request = require('supertest')
const app = require('../../app')

describe('GET /materials', () => {
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
            .get('/materials')
            .set('access_token', token)
            .end((err, res) => {
                if (err) done(err)

                // assert
                expect(res.statusCode).toEqual(200)
                expect(Array.isArray(res.body)).toEqual(true)
                expect(res.body[0]).toHaveProperty('name')
                expect(typeof res.body[0].name).toEqual('string')
                expect(res.body[0]).toHaveProperty('image_url')
                expect(typeof res.body[0].image_url).toEqual('string')
                expect(res.body[0]).toHaveProperty('category')
                expect(typeof res.body[0].category).toEqual('string')
                expect(res.body[0]).toHaveProperty('price')
                expect(typeof res.body[0].price).toEqual('number')
                expect(res.body[0]).toHaveProperty('stock')
                expect(typeof res.body[0].stock).toEqual('number')

                done()
            })
    })

    // error case ketika tidak ada akses token
    it('should send response 500', (done) => {
        request(app)
            .get('/materials')
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
})