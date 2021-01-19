const request = require('supertest')

const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const models = require('../models')

const clearCategory = require('./helpers/clear-category')
const clearUser = require('./helpers/clear-user')
const seedCategory = require('./helpers/seed-category')
const seedUser = require('./helpers/seed-user')

let admin_token
let customer_token
let id

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
    const category = await seedCategory(admin.id)
    id = category.id
    done()
  } catch (err) {
    console.log(err);
  }
})

afterAll(async (done) => {
  try {
    await clearUser()
    await clearCategory()
    models.sequelize.close()
    done()
  } catch (err) {
    console.log(err);
  }
})


describe('CRUD /categories', ()=> {
  describe('POST /categories', ()=> {
    it('success create', (done)=> {
      const body = {
        name: 'electronic',
      }
      request(app)
        .post('/categories')
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
  
          done()
        })
    })
    it('no access_token', (done)=> {
      const body = {
        name: 'electronic',
      }
      request(app)
        .post('/categories')
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
        name: 'electronic',
      }
      request(app)
        .post('/categories')
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
        name: '',
      }
      request(app)
        .post('/categories')
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
            expect.arrayContaining(['name must be filled'])
          )
  
          done()
        })
    })
  })

  describe('PUT /categories', ()=> {
    it('success edit', (done)=> {
      const body = {
        name: 'electronic',
      }
      request(app)
        .put(`/categories/${id}`)
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
  
          done()
        })
    })
    it('no access_token', (done)=> {
      const body = {
        name: 'electronic',
      }
      request(app)
        .put(`/categories/${id}`)
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
        name: 'electronic',
      }
      request(app)
        .put(`/categories/${id}`)
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
        name: '',
      }
      request(app)
        .put(`/categories/${id}`)
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
            expect.arrayContaining(['name must be filled'])
          )
  
          done()
        })
    })
  })

  describe('DELETE /categories', ()=> {
    it('no access_token', (done)=> {
      request(app)
        .delete(`/categories/${id}`)
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
      request(app)
        .delete(`/categories/${id}`)
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
      request(app)
        .delete(`/categories/${id}`)
        .set('access_token', admin_token)
        .end((err,res)=> {
          if (err) done(err)
  
          //Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('category deleted successfully')
  
          done()
        })
    })
  })
})
