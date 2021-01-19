const request = require('supertest')
const app = require('../app')
const clearProducts = require('./helpers/clear-products')

let token = null

describe("POST /products", () => {
  beforeAll(() => {
    const body = {
      email: "user@mail.com",
      password: "123456"
    }
    request(app)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        token = res.body.access_token
      })
  })

  afterAll((done) => {
    clearProducts()
      .then(() => {
        done()
      })
      .catch(console.log)
  })

  it('should send response with 201 status code', (done) => {
    const body = {
      name: 'google',
      image_url: 'https://www.gooogle.com',
      price: 100000,
      stock: 122
    }

    request(app) 
      .post('/products')
      .send(body)
      .set('access_token', token)
      .end((err, res) => {
        if(err) done(err)

        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('image_url')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('stock')
        done()
      })
  })
})

describe("POST /products", () => {
  beforeAll(() => {
    const body = {
      email: "user@mail.com",
      password: "123456"
    }
    request(app)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        token = res.body.access_token
      })
  })

  afterAll((done) => {
    clearProducts()
      .then(() => {
        done()
      })
      .catch(console.log)
  })

  it('should send response with 201 status code', (done) => {
    const body = {
      name: '',
      image_url: 'https://www.gooogle.com',
      price: 10000,
      stock: 122
    }

    request(app) 
      .post('/products')
      .send(body)
      .set('access_token', token)
      .end((err, res) => {
        if(err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Name is required')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})

describe("POST /products", () => {
  beforeAll(() => {
    const body = {
      email: "user@mail.com",
      password: "123456"
    }
    request(app)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        token = res.body.access_token
      })
  })

  afterAll((done) => {
    clearProducts()
      .then(() => {
        done()
      })
      .catch(console.log)
  })

  it('should send response with 201 status code', (done) => {
    const body = {
      name: 'google',
      image_url: 'https://www.gooogle.com',
      price: -5,
      stock: 122
    }

    request(app) 
      .post('/products')
      .send(body)
      .set('access_token', token)
      .end((err, res) => {
        if(err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('cannot be less than zero or a negative number')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})

describe("POST /products", () => {
  beforeAll(() => {
    const body = {
      email: "user@mail.com",
      password: "123456"
    }
    request(app)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        token = res.body.access_token
      })
  })

  afterAll((done) => {
    clearProducts()
      .then(() => {
        done()
      })
      .catch(console.log)
  })

  it('should send response with 201 status code', (done) => {
    const body = {
      name: 'google',
      image_url: 'https://www.gooogle.com',
      price: 100005,
      stock: -6
    }

    request(app) 
      .post('/products')
      .send(body)
      .set('access_token', token)
      .end((err, res) => {
        if(err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('cannot be less than zero or a negative number')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})