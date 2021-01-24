const request = require('supertest')
const app = require('../app')
const { Product, sequelize } = require('../models')
const { queryInterface } = sequelize
let id

beforeAll((done)=> {
  return queryInterface.bulkInsert('Products', [{
    name: 'Kopi Dangdut',
    image_url: 'https://disk.mediaindonesia.com/thumbs/1800x1200/news/2019/11/91f7001e5fedfa2b09288801657d38fc.jpg',
    price: 250000,
    stock: 10,
    createdAt: new Date(), 
    updatedAt: new Date()
  }], {})
    .then(data => {
      return Product.findAll({ limit: 1})
    })
    .then(data => {
        id = data[0].dataValues.id
        done()
    })
    .catch(err => {
        done(err)
    })

})

describe('DEL /products/:id', () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .delete('/products/' + id)
      .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTA5MTI5N30.g41cEAOFnYy110MrRi6sy-LRKycyBXmfaM-OsMoD99Y')
      .end((err, res) => {
        if(err) {
          done(err)
        }
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toEqual({"message": "Product success to delete"})
        done()
      })
  })

  it('should send response with 200 status code', (done) => {
    request(app)
      .delete('/products/' + id)
      .end((err, res) => {
        if(err) {
          done(err)
        }
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toEqual({
          "message": "jwt must be provided"
        })
        done()
      })
  })
})