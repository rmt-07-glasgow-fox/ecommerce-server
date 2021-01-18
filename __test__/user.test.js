const request = require('supertest')
const app = require('../app')

desribe('POST /user/login', () => {

    it('Should send response 200 status code', (done) => {
        const body = {
            email: 'admin@gmail.com',
            password: 'admin'
        }

        request(app)
            .post('/user/login')
    })

})