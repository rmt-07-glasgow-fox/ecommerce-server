const request = require('supertest')
const app = require('../../app')

describe('DELETE /materials/:id', () => {
    let token = null
    let materialId = null

    beforeAll((done) => {
        const user = {
            email: 'admin@gmail.com',
            password: 'admin123'
        }

        const initial = {
            name: 'Baja Lumayan Kuat',
            image_url: 'https://www.freepik.com/free-photo/texture-background_1167521.htm#page=1&query=steel&position=5',
            category: 'steel',
            price: 200000,
            stock: 20
        }

        // login
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

        // create
        request(app)
            .post('/materials')
            .set('access_token', token)
            .send(initial)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                materialId = res.body.id
            })
    })

    // success case
    it('should send response 200', (done) => {
        request(app)
            .delete('/materials/' + materialId)
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
            .delete('/materials/' + materialId)
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