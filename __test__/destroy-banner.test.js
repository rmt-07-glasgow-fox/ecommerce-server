const request = require('supertest')
const app = require('../app')
const { User, Banner } = require('../models')
const { generateToken } = require('../helpers/jwt')
const clearBanners = require('./helpers/clear-banners')
const models = require('../models')

describe('PUT /banners API should be working', function() {
  let access_token
  let user
  let newBanner
  
  beforeAll(done => {
    User.findOne({where: {email: 'admin@mail.com'}})
      .then(result => {
        let newBnr = {
          title: 'Banner 1',
          image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFs50OMbql_dj4bqK5NEK332-M01joBT2zwA&usqp=CAU',
          status: 'active',
        }
        user = result
        return Banner.create(newBnr)
      })
      .then(output => {
          newBanner = output
          const payload = { id: user.id, email: user.email }
          access_token = generateToken(payload)
          done()
      })
  })

  afterAll(done => {
    clearBanners()
    .then(function() {
      models.sequelize.close()
      done()
    })
    .catch(console.log)
  })
  
  it('should response with 200 status code', function(done) {

    request(app)
      .delete(`/banners/${newBanner.id}`)
      .set('access_token', access_token)
      .end(function(err, res) {
        if(err) done(err)

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Banner succesfully deleted')

        done()
      })
  })

  it('should response with status code 404 when banner is not found', function(done) {

    request(app)
      .delete(`/banners/1000`)
      .set('access_token', access_token)
      .end(function(err, res) {
        if(err) done(err)

        expect(res.statusCode).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('resource not found')

        done()
      })
  })

  it('should response with status code 401 when jwt is not provided', function(done) {

    request(app)
      .delete(`/banners/${newBanner.id}`)
      .end(function(err, res) {
        if(err) done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('JWT must be provided')

        done()
      })
  })


})
