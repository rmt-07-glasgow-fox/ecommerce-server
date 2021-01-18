const request = require('supertest')
const app = require('../../app')

describe('POST /login', () => {
    // berhasil
    it('should send response 200', (done) => {
        // settup
        const user = {
            email: 'admin@gmail.com',
            password: 'admin123'
        }

        // execute
        request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                if(err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('access_token')
                expect(typeof res.body.access_token).toEqual('string')
        
                done()
            })
    })

    // email ada, password salah
    it('should send response 401', (done) => {
        // settup
        const user = {
            email: 'admin@gmail.com',
            password: 'admin124'
        }

        // execute
        request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                if(err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid email/password!')

                done()
            })
    })

    // email tidak ada di db
    it('should send response 401', (done) => {
        // settup
        const user = {
            email: 'admin123@gmail.com',
            password: 'admin123'
        }

        // execute
        request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                if(err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid email/password!')

                done()
            })
    })

    // email dan password terisi kosong
    it('should send response 401', (done) => {
        // settup
        const user = {
            email: '',
            password: ''
        }

        // execute
        request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                if(err) {
                    done(err)
                }

                // assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid email/password!')

                done()
            })
    })
})