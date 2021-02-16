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
afterAll(done => {
  queryInterface.bulkDelete('Banners')
    .then(() => {
      done()
    })
    .catch(done)
})
// end


describe('PUT /banners', () => {
  const dataBannerUpdate = { title: 'Cloths', status: false, image_url: 'url_update.jpg', CategoryId: 1 }
  const dataBannerNoCategory = { title: 'Cloths Adidas', status: false, image_url: 'url.jpg', CategoryId: 0 }
  const emptyDataBanner = { title: '', image_url: '',  status: '', }
  const dataMinusStock = { title: 'Cloths Adidas', status: false, image_url: 'url.jpg', stock: -10, CategoryId: 0  }
  const dataMinusPrice = { title: 'Cloths Adidas', status: false, image_url: 'url.jpg', CategoryId: 0 }
  const dataNotValidType = { title: 1000, image_url: 1000,  status: 'String', CategoryId: 0  }

  describe('Success', () => {
    test('Update banner success', (done) => {
      request(app)
        .put('/banners/'+id_banner)
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(dataBannerUpdate)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('name', dataBannerUpdate.name)
          expect(body).toHaveProperty('image_url', dataBannerUpdate.image_url)
          expect(body).toHaveProperty('stock', dataBannerUpdate.stock)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('Failed', () => {
    test('Foreign key not exist!', (done) => {
      request(app)
        .put('/banners/'+id_banner)
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
        .put('/banners/'+id_banner)
        .set('Accept', 'application/json')
        .send(dataBannerUpdate)
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
        .send(dataBannerUpdate)
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
        .put('/banners/'+id_banner)
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
    test('Data Not Found', (done) => {
      request(app)
        .put('/banners/'+id_banner+10)
        .set('Accept', 'application/json')
        .set('access_token', access_token_admin)
        .send(dataBannerUpdate)
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
