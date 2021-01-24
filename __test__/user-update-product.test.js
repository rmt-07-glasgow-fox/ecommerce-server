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

describe('PUT /products/:id', () => {
  it('should send response with 200 status code', (done) => {
    const product = {
      name: 'yu-gi-oh card',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0N_XQ416WK0Loq2lcHpJVm2Sjitr2n09-5g&usqp=CAU',
      price: 250000,
      stock: 50
    }
    request(app)
      .put('/products/' + id)
      .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTA5MTI5N30.g41cEAOFnYy110MrRi6sy-LRKycyBXmfaM-OsMoD99Y')
      .send(product)
      .end((err, res) => {
        if(err) {
          done(err)
        }
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toEqual('number')
        expect(res.body).toHaveProperty('name')
        expect(typeof res.body.name).toEqual('string')
        expect(res.body).toHaveProperty('image_url')
        expect(typeof res.body.image_url).toEqual('string')
        expect(res.body).toHaveProperty('price')
        expect(typeof res.body.price).toEqual('number')
        expect(res.body.price).toBeGreaterThan(0)
        expect(res.body).toHaveProperty('stock')
        expect(typeof res.body.stock).toEqual('number')
        expect(res.body.stock).toBeGreaterThan(0)
        done()
      })
  })

  it('should send response with 400 status code', (done) => {
    const product = {
      name: 'yu-gi-oh card',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0N_XQ416WK0Loq2lcHpJVm2Sjitr2n09-5g&usqp=CAU',
      price: -1,
      stock: -2
    }
    request(app)
      .put('/products/' +id)
      .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTA5MTI5N30.g41cEAOFnYy110MrRi6sy-LRKycyBXmfaM-OsMoD99Y')
      .send(product)
      .end((err, res) => {
        if(err) {
          done(err)
        }
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              "column": "price", 
              "message": "The price should not be less than 1."
            }, 
            {
              "column": "stock", 
              "message": "The Stoct should not be less than 1."
            }, 
          ])
        )
        done()
      })
  })

  it('should send response with 400 status code', (done) => {
    const product = {
      name: 'yu-gi-oh card',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0N_XQ416WK0Loq2lcHpJVm2Sjitr2n09-5g&usqp=CAU',
      price: 'string',
      stock: 'string'
    }
    request(app)
      .put('/products/' +id)
      .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTA5MTI5N30.g41cEAOFnYy110MrRi6sy-LRKycyBXmfaM-OsMoD99Y')
      .send(product)
      .end((err, res) => {
        if(err) {
          done(err)
        }
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              "column": "price", 
              "message": "Price just allow number"
            }, 
            {
              "column": "stock", 
              "message": "Stock just allow number"
            },
          ])
        )
        done()
      })
  })
  
  it('should send response with 400 status code', (done) => {
    const product = {
      name: 'yu-gi-oh card',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0N_XQ416WK0Loq2lcHpJVm2Sjitr2n09-5g&usqp=CAU',
      price: 'string',
      stock: 'string'
    }
    request(app)
      .put('/products/' +id)
      .send(product)
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