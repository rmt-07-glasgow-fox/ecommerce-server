const request = require('supertest')
const app = require('../../app')

describe('PUT /materials/:id', () => {
    let token =  null

    beforeAll((done) => {
        const user = {
            email: 'admin@gmail.com',
            password: 'admin123'
        }

        request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                if(err) {
                    done(err)
                }

                token = res.body.access_token
                done()
            })
    })

    // success case
    it('should send response 200', (done) => {
        const material = {
            name: 'Besi Lumayan Kuat',
            image_url: 'https://www.freepik.com/free-photo/texture-background_1167521.htm#page=1&query=steel&position=5',
            category: 'besi',
            price: 200000,
            stock: 15
        }

        request(app)
            .put('/materials/1')
            .set('access_token', token)
            .send(material)
            .end((err, res) => {
                if(err) done(err)

                // assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('name')
                expect(res.body.name).toEqual(material.name)
                expect(res.body).toHaveProperty('image_url')
                expect(res.body.image_url).toEqual(material.image_url)
                expect(res.body).toHaveProperty('category')
                expect(res.body.category).toEqual(material.category)
                expect(res.body).toHaveProperty('price')
                expect(res.body.price).toEqual(material.price)
                expect(res.body).toHaveProperty('stock')
                expect(res.body.stock).toEqual(material.stock)

                done()
            })
    })

    // epmty field requirement
    it('should send response with code 401', (done) => {
        // setup
        const material = {
            name: '',
            image_url: 'https://www.freepik.com/free-photo/texture-background_1167521.htm#page=1&query=steel&position=5',
            category: 'steel',
            price: 100000,
            stock: 10
        }

        // execute
        request(app)
            .put('/materials/1')
            .set('access_token', token)
            .send(material)
            .end((err, res) => {
                if(err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(500)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Validation error: Item Name should not be empty!')

                done()
            })
    })

    // price diisi angka minus
    it('should send response with code 401', (done) => {
        // setup
        const material = {
            name: 'Baja Super Kuat',
            image_url: 'https://www.freepik.com/free-photo/texture-background_1167521.htm#page=1&query=steel&position=5',
            category: 'steel',
            price: -100000,
            stock: 10
        }

        // execute
        request(app)
            .post('/materials/1')
            .set('access_token', token)
            .send(material)
            .end((err, res) => {
                if(err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(404)
                expect(typeof res.body).toEqual('object')

                done()
            })
    })

    // stock diisi angka minus
    it('should send response with code 401', (done) => {
        // setup
        const material = {
            name: 'Baja Super Kuat',
            image_url: 'https://www.freepik.com/free-photo/texture-background_1167521.htm#page=1&query=steel&position=5',
            category: 'steel',
            price: 100000,
            stock: -1
        }

        // execute
        request(app)
            .post('/materials/1')
            .set('access_token', token)
            .send(material)
            .end((err, res) => {
                if(err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(404)
                expect(typeof res.body).toEqual('object')

                done()
            })
    })

    // tidak ada akses token
    it('should send response 500', (done) => {
        const material = {
            name: 'Besi Lumayan Kuat',
            image_url: 'https://www.freepik.com/free-photo/texture-background_1167521.htm#page=1&query=steel&position=5',
            category: 'besi',
            price: 200000,
            stock: 15
        }

        request(app)
            .put('/materials/1')
            .send(material)
            .end((err, res) => {
                if(err) done(err)

                // assert
                expect(res.statusCode).toEqual(500)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('jwt must be provided')

                done()
            })
    })

    // salah params atau item tidak ada dalam db
    it('should send response 404', (done) => {
        const material = {
            name: 'Besi Lumayan Kuat',
            image_url: 'https://www.freepik.com/free-photo/texture-background_1167521.htm#page=1&query=steel&position=5',
            category: 'besi',
            price: 200000,
            stock: 15
        }

        request(app)
            .put('/materials/3')
            .set('access_token', token)
            .send(material)
            .end((err, res) => {
                if(err) done(err)

                // assert
                expect(res.statusCode).toEqual(404)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Item not found')

                done()
            })
    })
})