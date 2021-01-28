const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')

describe('POST /banners API should be working', function() {
  let access_token

  beforeAll(done => {
    User.findOne({where: {email: 'admin@mail.com'}})
      .then(user => {
        const payload = { id: user.id, email: user.email }
        access_token = generateToken(payload)
        done()
      })
  })
  
  it('should response with 201 status code', function(done) {
    let body = {
      title: 'Banner 1',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFs50OMbql_dj4bqK5NEK332-M01joBT2zwA&usqp=CAU',
      status: 'active',
    }

    request(app)
      .post('/banners')
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res) {
        if(err) done(err)

        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toEqual('number')
        expect(res.body).toHaveProperty('title')
        expect(res.body.title).toEqual(body.title)
        expect(res.body).toHaveProperty('image_url')
        expect(res.body.image_url).toEqual(body.image_url)
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toEqual(body.status)

        done()
      })
  })

  it ('should response with 400 status code when title is empty', function(done) {
    let body = {
      title: '',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFs50OMbql_dj4bqK5NEK332-M01joBT2zwA&usqp=CAU',
      status: 'active',
    }

    request(app)
      .post('/banners')
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Banner title is required'])
        )

        done()
      })
  })

  it ('should response with 400 status code when image_url is empty', function(done) {
    let body = {
      title: 'Banner 1',
      image_url: '',
      status: 'active',
    }

    request(app)
      .post('/banners')
      .send(body)
      .set('access_token', access_token)
      .end(function(err, res) {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['Image url is required'])
        )

        done()
      })
  })

  it ('should response with 401 when jwt is not provided', function(done) {
    let body = {
      title: 'Banner 1',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFs50OMbql_dj4bqK5NEK332-M01joBT2zwA&usqp=CAU',
      status: 'active',
    }

    request(app)
      .post('/banners')
      .send(body)
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
