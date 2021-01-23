const request = require('supertest')
const { clearBanner, generateToken } = require('../../helpers')
const { sequelize, Banner } = require('../../models')
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
  Banner.create({
    "id": 1,
    "title": "Promo Akhir Tahun",
    "status": false,
    "image_url": "https://assets.adidas.com/images.jpg"
  }).then(() => {
    done()
  })
})

describe('GET /banners ==> Success', () => {
  it('Success fetch all banners, return 200 status code', (done) => {
    request(app)
      .get('/banners')
      .set('access_token', access_token)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body))
        expect(res.body[0]).toHaveProperty('id')
        expect(res.body[0]).toHaveProperty('title')
        expect(res.body[0]).toHaveProperty('status')
        expect(res.body[0]).toHaveProperty('image_url')
        expect(res.body[0]).toHaveProperty('UserId')
        done()
      })
  })
})

describe('GET /banners ==> Failed', () => {
  it('Without passing access token, return 400 status code', (done) => {
    request(app)
      .get('/products')
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })
})
