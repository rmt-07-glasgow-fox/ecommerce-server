const request = require('supertest')
const app = require('../../app')
const { generateToken } = require('../../helpers/jwt')
const { sequelize, User, Banner } = require('../../models')
const { queryInterface } = sequelize

// Get access_token
let access_token_admin = ''
let access_token_user = ''
let dataBanner = [
  { 
    title: 'Cloths Adidas',
    status: false,
    image_url: 'url.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
let id_banner = ''

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
      return queryInterface.bulkInsert('Banners', dataBanner, {} )
    })
    .then(() => {
      return Banner.findAll({ limit: 1 })
    })
    .then(banners => {
      id_banner = banners[0].dataValues.id
      done()
    })
    .catch(done)
})
// end

describe('DELETE /banners', () => {
  describe('Success', () => {
    test('Delete banner success', (done) => {
      request(app)
        .delete('/banners/'+id_banner)
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', 'Banner success deleted!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('Failed', () => {
    test('Access token not exist, must login first!', (done) => {
      request(app)
        .put('/banners/'+id_banner)
        .set('Accept', 'application/json')
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
        .put('/banners/'+id_banner)
        .set('Accept', 'application/json')
        .set('access_token', access_token_user)
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
    test('Data Not Found', (done) => {
      request(app)
        .delete('/banners/'+id_banner)
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(404)
          expect(body).toHaveProperty('message', 'Banner Not Found')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})
