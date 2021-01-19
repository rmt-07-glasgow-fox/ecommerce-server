const request = require('supertest')

const app = require('../app')
const { generateToken, cekToken } = require('../helpers/jwt')
const models = require('../models')

const clearBanner = require('./helpers/clear-banner')
const clearUser = require('./helpers/clear-user')
const seedBanner = require('./helpers/seed-banner')
const seedUser = require('./helpers/seed-user')

let admin_token = ''
let customer_token = ''
let id = ''

beforeAll(async (done) => {
  try {
    const admin = await seedUser('admin@mail.com','1234','admin')
    const customer = await seedUser('rafli@mail.com','123123123')
    admin_token = generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role
    })
    customer_token = generateToken({
      id: customer.id,
      email: customer.email,
      role: customer.role
    })
    const banner = await seedBanner(admin.id)
    id = banner.id
    done()
  } catch (err) {
    console.log(err);
  }
})

afterAll(async (done) => {
  try {
    await clearUser()
    await clearBanner()
    models.sequelize.close()
    done()
  } catch (err) {
    console.log(err);
  }
})

describe('CRUD /banners', ()=> {
  describe('POST /banners', ()=> {
    it('success create', (done)=> {
      const body = {
        title: 'discon shoes',
        status: 'active',
        image_url: 'https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?size=626&ext=jpg',
        UserId: cekToken(admin_token).id
      }
      request(app)
        .post('/banners')
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('title')
          expect(res.body.title).toEqual(body.title)
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual(body.status)
          expect(res.body).toHaveProperty('image_url')
          expect(res.body.image_url).toEqual(body.image_url)
  
          done()
        })
    })
    it('no access_token', (done)=> {
      const body = {
        title: 'discon shoes',
        status: 'active',
        image_url: 'https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?size=626&ext=jpg',
        UserId: cekToken(admin_token).id
      }
      request(app)
        .post('/banners')
        .send(body)
        .set('access_token', '')
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Jwt needed')
  
          done()
        })
    })
    it('not admin', (done)=> {
      const body = {
        title: 'discon shoes',
        status: 'active',
        image_url: 'https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?size=626&ext=jpg',
        UserId: cekToken(customer_token).id
      }
      request(app)
        .post('/banners')
        .send(body)
        .set('access_token', customer_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('you dont have access')
  
          done()
        })
    })
    it('field require not filled', (done)=> {
      const body = {
        title: '',
        status: '',
        image_url: '',
        UserId: cekToken(admin_token).id
      }
      request(app)
        .post('/banners')
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual(
            expect.arrayContaining(['title must be filled','image_url must be filled'])
          )
  
          done()
        })
    })
  })

  describe('PUT /banners', ()=> {
    it('success update', (done)=> {
      const body = {
        title: 'discon shoes',
        status: 'active',
        image_url: 'https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?size=626&ext=jpg',
        UserId: cekToken(admin_token).id
      }
      request(app)
        .put(`/banners/${id}`)
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('title')
          expect(res.body.title).toEqual(body.title)
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual(body.status)
          expect(res.body).toHaveProperty('image_url')
          expect(res.body.image_url).toEqual(body.image_url)
  
          done()
        })
    })
    it('no access_token', (done)=> {
      const body = {
        title: 'discon shoes',
        status: 'active',
        image_url: 'https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?size=626&ext=jpg',
        UserId: cekToken(admin_token).id
      }
      request(app)
        .put(`/banners/${id}`)
        .send(body)
        .set('access_token', '')
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Jwt needed')
  
          done()
        })
    })
    it('not admin', (done)=> {
      const body = {
        title: 'discon shoes',
        status: 'active',
        image_url: 'https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?size=626&ext=jpg',
        UserId: cekToken(customer_token).id
      }
      request(app)
        .put(`/banners/${id}`)
        .send(body)
        .set('access_token', customer_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('you dont have access')
  
          done()
        })
    })
    it('field require not filled', (done)=> {
      const body = {
        title: '',
        status: '',
        image_url: '',
        UserId: cekToken(admin_token).id
      }
      request(app)
        .put(`/banners/${id}`)
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual(
            expect.arrayContaining(['title must be filled','image_url must be filled'])
          )
  
          done()
        })
    })
  })

  describe('DELETE /banners', ()=> {
    it('no access_token', (done)=> {
      const body = {
        title: 'discon shoes',
        status: 'active',
        image_url: 'https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?size=626&ext=jpg',
        UserId: cekToken(admin_token).id
      }
      request(app)
        .delete(`/banners/${id}`)
        .set('access_token', '')
        .end((err,res)=> {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('Jwt needed')

          done()
        })
    })
    it('not admin', (done)=> {
      const body = {
        title: 'discon shoes',
        status: 'active',
        image_url: 'https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?size=626&ext=jpg',
        UserId: cekToken(customer_token).id
      }
      request(app)
        .delete(`/banners/${id}`)
        .set('access_token', customer_token)
        .end((err,res)=> {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('you dont have access')

          done()
        })
    })
    it('success delete', (done)=> {
      const body = {
        title: 'discon shoes',
        status: 'active',
        image_url: 'https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?size=626&ext=jpg',
        UserId: cekToken(admin_token).id
      }
      request(app)
        .delete(`/banners/${id}`)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('banner deleted successfully')

          done()
        })
    })
  })
})
