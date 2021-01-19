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
      name: '',
      image_url: '',
      price: '',
      stock: ''
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
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining([
            'Name is required',
            'Image Url is required',
            'Price is required',
            'Stock is required',
          ])
        )
        done()
      })
  })

  it('should send response with 400 status code', (done) => {
    const product = {
      name: 123,
      image_url: 123,
      price: -1,
      stock: -1
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
        expect(typeof res.name).toEqual('number')
        expect(typeof res.image_url).toHaveLength(10)
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.stock).toBeLessThanOrEqual(0)
        expect(res.body.price).toBeLessThanOrEqual(0)
        expect(res.body.errors).toEqual(
          expect.arrayContaining([
            'Name cannot contain number',
            'Image Url to short',
            'Minimum price is 1',
            'Minimum stock is 1',
          ])
        )
        done()
      })
  })
})