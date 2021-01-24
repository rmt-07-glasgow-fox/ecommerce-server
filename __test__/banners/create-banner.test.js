const request = require('supertest')
const app = require('../../app')
const { generateToken } = require('../../helpers/jwt')
const { sequelize, User } = require('../../models')
const { queryInterface } = sequelize

// get access token
let access_token_admin = ''
let access_token_user = ''

beforeAll(done => {
  User.findOne({ where: { email: 'admin@mail.com' } })
    .then(user => {
      const { id, name, email, role } = user
      access_token_admin = generateToken({ id, name, email, role })
      return User.findOne({ where: { email: 'user@mail.com' } })
    })
    .then(user => {
      const { id, name, email, role } = user
      access_token_user = generateToken({ id, name, email, role })
      done()
    })
    .catch(done)
})
// end

afterAll(done => {
  queryInterface.bulkDelete('Banners')
    .then(() => {
      done()
    })
    .catch(done)
})

describe('POST /banners', () => {
  const dataBanner = { title: 'Cloths', status: false, image_url: 'url_update.jpg', CategoryId: 1 }
  const dataBannerNoCategory = { title: 'Cloths Adidas', status: false, image_url: 'url.jpg', CategoryId: 0 }
  const emptyDataBanner = { title: '', image_url: '',  status: '', }
  const dataNotValidType = { title: 1000, image_url: 1000,  status: 'String', CategoryId: 0  }

  describe('Create banner success', () => {
    test('Create banner success', (done) => {
      request(app)
        .post('/banners')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(dataBanner)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('title', dataBanner.title)
          expect(body).toHaveProperty('image_url', dataBanner.image_url)
          expect(body).toHaveProperty('status', dataBanner.status)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('Create banner failed', () => {
    test('Foreign key not exist!', (done) => {
      request(app)
        .post('/banners')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(dataBannerNoCategory)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Failed! Foreign key not exist')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    test('Access token not exist, must login first!', (done) => {
      request(app)
        .post('/banners')
        .set('Accept', 'application/json')
        .send(dataBanner)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'Please login first!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    test('Access token exist, but not admin!', (done) => {
      request(app)
        .post('/banners')
        .set('Accept', 'application/json')
        .set('access_token', access_token_user)
        .send(dataBanner)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(403)
          expect(body).toHaveProperty('message', 'You dont have access!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    test('Field is empty', (done) => {
      request(app)
        .post('/banners')
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(emptyDataBanner)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 
            expect.arrayContaining([
              'Title cannot be empty!',
              'Image cannot be empty!'
            ]))
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})
