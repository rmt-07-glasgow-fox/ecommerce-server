const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')

describe('GET /banners API should be working', function() {
  let access_token

  beforeAll(done => {
    User.findOne({where: {email: 'admin@mail.com'}})
      .then(user => {
        const payload = { id: user.id, email: user.email }
        access_token = generateToken(payload)
        done()
      })
  })

  it('should response with 200 status code', function(done) {
    request(app)
      .get('/banners')
      .set('access_token', access_token)
      .end(function(err, res) {
        if(err) done(err)

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
        if(res.body.length > 0) {
          res.body.map(banner => {
            expect(banner).toHaveProperty('id')
            expect(banner).toHaveProperty('title')
            expect(banner).toHaveProperty('image_url')
            expect(banner).toHaveProperty('status')
          })
        }

        done()
      })
      
  })

  it ('should response with 401 when jwt is not provided', function(done) {

    request(app)
      .post('/banners')
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual(`JWT must be provided`)

        done()
      })
  })

})
