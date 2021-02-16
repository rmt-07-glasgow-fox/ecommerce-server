const request = require('supertest')
const app = require('../app')

describe('POST /products', () => {
  it('should send response with 201 status code', (done) => {
    const product = {
      name: 'yu-gi-oh card',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0N_XQ416WK0Loq2lcHpJVm2Sjitr2n09-5g&usqp=CAU',
      price: 250000,
      stock: 50
    }
    request(app)
      .post('/products')
      .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTA5MTI5N30.g41cEAOFnYy110MrRi6sy-LRKycyBXmfaM-OsMoD99Y')
      .send(product)
      .end((err, res) => {
        if(err) {
          done(err)
        }
        expect(res.statusCode).toEqual(201)
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
      .post('/products')
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
      .post('/products')
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
      .post('/products')
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