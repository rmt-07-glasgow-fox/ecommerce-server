const request = require('supertest')
const app = require('../app')
const clearUsers = require('./helpers/clearUsers')
const models = require('../models/')
const seedUsers = require('./helpers/seedUsers')

beforeAll((done) => {
    // create user di sini, jangan lupa hooks beforeCreate utk hash password
    seedUsers()
        .then(() => {
            done()
        })
        .catch(console.log)
})

//afterAll((done) => {
//clearUsers()
//.then(() => {
//models.sequelize.close()
//done()
//})
//.catch(console.log)
//})

describe('POST /login', () => {

    // success case
    it('should send response with 200 status code', (done) => {

    })

    // unauthorised case
    it('should send response with 401 status code', (done) => {

    })

})
