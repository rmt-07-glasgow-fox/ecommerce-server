const request = require('supertest')

const app = require('../app')
const { generateToken, cekToken } = require('../helpers/jwt')

const models = require('../models')
const clearProduct = require('./helpers/clear-product')
const clearUser = require('./helpers/clear-user')
const seedAdmin = require('./helpers/seed-admin')
const seedProduct = require('./helpers/seed-product')

const admin = {
  id: 1,
  email: 'admin@mail.com',
  role: 'admin'
}
const customer = {
  id: 2,
  email: 'rafli@mail.com',
  role: 'customer'
}

let admin_token = ''
let customer_token = ''
let id

beforeAll((done) => {
  seedAdmin()
  .then(()=> {
    
    admin_token = generateToken(admin)
    customer_token = generateToken(customer)

    return seedProduct(cekToken(admin_token).id)
  })
  .then(product=>{
    id = product.id
    done()
  })
  .catch(err => console.log(err))
})

afterAll((done)=>{
  clearUser()
  .then(()=>{
    return clearProduct()
  })
  .then(()=>{
    models.sequelize.close()
    done()
  })
  .catch(err => console.log(err))
})

describe('PUT /products', () => {
  it('should send response with status 200 status code', (done) => {
    const body = {
      name: 'Xiaomi Redmi note 8',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
      price: 2100000,
      stock: 10,
      UserId: cekToken(admin_token).id
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
      stock: 10,
      UserId: cekToken(admin_token).id
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
      stock: 10,
      UserId: cekToken(customer_token).id
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
      stock: '',
      UserId: cekToken(admin_token).id
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
      stock: -10,
      UserId: cekToken(admin_token).id
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
      stock: 10,
      UserId: cekToken(admin_token).id
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
      stock: 'asdsa',
      UserId: cekToken(admin_token).id
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