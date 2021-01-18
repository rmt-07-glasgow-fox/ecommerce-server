const request = require('supertest')
const app = require('../app')
const clearUsers = require('./helpers/clearUsers')



describe('POST /login', () => {
    afterAll((done) => {
        clearUsers()
            .then(() => {
                done()
            })
            .catch(console.log)
    })

    it('should send response with 200 status code', (done) => {

    })


    it('should send response with 401 status code', (done) => {

    })

})
