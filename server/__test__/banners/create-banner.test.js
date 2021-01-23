const request = require('supertest')
const { clearBanner, generateToken } = require('../../helpers')
const { sequelize } = require('../../models')
const app = require('../../app')
const admin_account = {
  id: 1,
  email: 'admin@gmail.com'
}
const fake_account = {
  id:2,
  email: 'bukanadmin@gmail.com'
}
let access_token
let access_token2

afterAll(done => {
  clearBanner()
  .then(() => {
    sequelize.close()
    done()
  })
})

beforeAll(done => {
  access_token = generateToken(admin_account)
  access_token2 = generateToken(fake_account)
  done()
})

describe('POST /banners ==> Success', () => {
  it('Success add banners, return 201 status code', (done) => {
    const body = {
      "title": "Promo Akhir Tahun",
      "status": false,
      "image_url": "https://assets.adidas.com/images.jpg"
    }
    request(app)
      .post('/banners')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('title')
        expect(res.body.title).toEqual(body.title)
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toEqual(body.status)
        expect(res.body).toHaveProperty('image_url')
        expect(res.body.image_url).toEqual(body.image_url)
        done()
      })
  })
})

describe('POST /banners ==> Failed', () => {
  it('Without passing access token, return 400 status code', (done) => {
    const body = {
      "title": "Promo Akhir Tahun",
      "status": false,
      "image_url": "https://assets.adidas.com/images.jpg"
    }
    request(app)
      .post('/banners')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Invalid access token, return 401 status code', (done) => {
    const body = {
      "title": "Promo Akhir Tahun",
      "status": false,
      "image_url": "https://assets.adidas.com/images.jpg"
    }
    request(app)
      .post('/banners')
      .set('access_token', access_token2)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Required column not filled, return 400 status code', (done) => {
    const body = {
      "title": "",
      "status": false,
      "image_url": "https://assets.adidas.com/images.jpg"
    }
    request(app)
      .post('/banners')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Invalid data type, return 400 status code', (done) => {
    const body = {
      "title": "Promo",
      "status": "active",
      "image_url": "https://assets.adidas.com/images.jpg"
    }
    request(app)
      .post('/banners')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message))
        done()
      })
  })
})