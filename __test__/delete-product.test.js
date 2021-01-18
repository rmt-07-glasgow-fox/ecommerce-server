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
    console.log(id, '<<<<');
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