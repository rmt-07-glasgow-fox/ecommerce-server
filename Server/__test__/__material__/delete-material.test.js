const request = require('supertest')
const app = require('../../app')

describe('DELETE /materials/:id', () => {
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
            .delete('/materials/6')
            .set('access_token', token)
            .end((err, res) => {
                if (err) done(err)

                // assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Item successfully deleted')

                done()
            })
    })

    // error case ketika tidak ada akses token
    it('should send response 500', (done) => {
        request(app)
            .delete('/materials/1')
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

    // jika params id salah/ material tidak ada di db
    it('should send response 200', (done) => {
        request(app)
            .delete('/materials/3')
            .set('access_token', token)
            .end((err, res) => {
                if (err) done(err)

                expect(res.statusCode).toEqual(404)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Item not found')

                done()
            })
    })


})