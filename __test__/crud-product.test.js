const request = require('supertest')

const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const models = require('../models')

const clearProduct = require('./helpers/clear-product')
const clearUser = require('./helpers/clear-user')
const seedProduct = require('./helpers/seed-product')
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
    const product = await seedProduct(admin.id)
    id = product.id
    done()
  } catch (err) {
    console.log(err);
  }
})

afterAll(async (done) => {
  try {
    await clearUser()
    await clearProduct()
    models.sequelize.close()
    done()
  } catch (err) {
    console.log(err);
  }
})

describe('CRUD /products', () => {
  describe('POST /products', () => {
    it('should send response with status 201 status code', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: 2100000,
        stock: 10
      }
      //execute
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('name')
          expect(res.body.name).toEqual(body.name)
          expect(res.body).toHaveProperty('image_url')
          expect(res.body.image_url).toEqual(body.image_url)
          expect(res.body).toHaveProperty('price')
          expect(res.body.price).toEqual(body.price)
          expect(typeof res.body.price).toEqual('number')
          expect(res.body).toHaveProperty('stock')
          expect(res.body.stock).toEqual(body.stock)
          expect(typeof res.body.stock).toEqual('number')
  
          done()
        })
    })
    it('no access_token', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: 2100000,
        stock: 10
      }
      //execute
      request(app)
        .post('/products')
        .send(body)
        .set('access_token','')
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(res.body.message).toEqual('Jwt needed')
  
          done()
        })
    })
    it('not admin', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: 2100000,
        stock: 10
      }
      //execute
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', customer_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(res.body.message).toEqual('you dont have access')
  
          done()
        })
    })
    it('field require not filled', (done) => {
      const body = {
        name: '',
        image_url: '',
        price: '',
        stock: ''
      }
      //execute
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(Array.isArray(res.body.message)).toEqual(true)
  
          done()
        })
    })
    it('stock negatif', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: 2100000,
        stock: -10
      }
      //execute
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(Array.isArray(res.body.message)).toEqual(true)
          expect(res.body.message).toEqual(
            expect.arrayContaining(['stock must be more then equal 0'])
          )
  
          done()
        })
    })
    it('price negatif', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: -2100000,
        stock: 10
      }
      //execute
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(Array.isArray(res.body.message)).toEqual(true)
          expect(res.body.message).toEqual(
            expect.arrayContaining(['price must be more then equal 0'])
          )
  
          done()
        })
    })
    it('field filled with difference data type', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: 'asdsa',
        stock: 'asdsa'
      }
      //execute
      request(app)
        .post('/products')
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(Array.isArray(res.body.message)).toEqual(true)
          expect(res.body.message).toEqual(
            expect.arrayContaining(['stock must be a number','price must be a number'])
          )
  
          done()
        })
    })
  })
  
  describe('PUT /products', () => {
    it('should send response with status 200 status code', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: 2100000,
        stock: 10
      }
      //execute
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('id')
          expect(typeof res.body.id).toEqual('number')
          expect(res.body).toHaveProperty('name')
          expect(res.body.name).toEqual(body.name)
          expect(res.body).toHaveProperty('image_url')
          expect(res.body.image_url).toEqual(body.image_url)
          expect(res.body).toHaveProperty('price')
          expect(res.body.price).toEqual(body.price)
          expect(typeof res.body.price).toEqual('number')
          expect(res.body).toHaveProperty('stock')
          expect(res.body.stock).toEqual(body.stock)
          expect(typeof res.body.stock).toEqual('number')
  
          done()
        })
    })
    it('no access_token', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: 2100000,
        stock: 10
      }
      //execute
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .set('access_token','')
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(res.body.message).toEqual('Jwt needed')
  
          done()
        })
    })
    it('not admin', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: 2100000,
        stock: 10
      }
      //execute
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .set('access_token', customer_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(res.body.message).toEqual('you dont have access')
  
          done()
        })
    })
    it('field require not filled', (done) => {
      const body = {
        name: '',
        image_url: '',
        price: '',
        stock: ''
      }
      //execute
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(Array.isArray(res.body.message)).toEqual(true)
  
          done()
        })
    })
    it('stock negatif', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: 2100000,
        stock: -10
      }
      //execute
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(Array.isArray(res.body.message)).toEqual(true)
          expect(res.body.message).toEqual(
            expect.arrayContaining(['stock must be more then equal 0'])
          )
  
          done()
        })
    })
    it('price negatif', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: -2100000,
        stock: 10
      }
      //execute
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(Array.isArray(res.body.message)).toEqual(true)
          expect(res.body.message).toEqual(
            expect.arrayContaining(['price must be more then equal 0'])
          )
  
          done()
        })
    })
    it('field filled with difference data type', (done) => {
      const body = {
        name: 'Xiaomi Redmi note 8',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
        price: 'asdsa',
        stock: 'asdsa'
      }
      //execute
      request(app)
        .put(`/products/${id}`)
        .send(body)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(Array.isArray(res.body.message)).toEqual(true)
          expect(res.body.message).toEqual(
            expect.arrayContaining(['stock must be a number','price must be a number'])
          )
  
          done()
        })
    })
  })

  describe('DELETE /products', () => {
    it('no access_token', (done) => {
      //execute
      request(app)
        .delete(`/products/${id}`)
        .set('access_token','')
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(res.body.message).toEqual('Jwt needed')
  
          done()
        })
    })
    it('not admin', (done) => {
      //execute
      request(app)
        .delete(`/products/${id}`)
        .set('access_token', customer_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(403)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('Error')
          expect(res.body).toHaveProperty('status')
          expect(res.body.message).toEqual('you dont have access')
  
          done()
        })
    })
    it('should send response with status 200 status code', (done) => {
      //execute
      request(app)
        .delete(`/products/${id}`)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('product deleted successfully')
  
          done()
        })
    })
  })
})

