const request = require('supertest')

const app = require('../app')

const models = require('../models')
const clearUser = require('./helpers/clear-user')
const seedUser = require('./helpers/seed-user')

beforeAll((done)=> {
  seedUser()
  .then(()=> {
    done()
  })
  .catch(err => console.log(err))
})
afterAll((done)=>{
  clearUser()
  .then(()=>{
    models.sequelize.close()
    done()
  })
  .catch(err => console.log(err))
})

describe('POST /login', ()=> {

  it('should send response with status 200 status code', (done) => {
    //setup
    const body = {
      email: 'rafli@gmail.com',
      password: '123123123'
    }
    //execute
    request(app)
      .post('/login')
      .send(body)
      .end((err,res)=> {
        if (err) done(err)

        //Assert
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toEqual('number')
        expect(res.body).toHaveProperty('email')
        expect(res.body.email).toEqual(body.email)
        expect(res.body).toHaveProperty('access_token')

        done()
      })
  })

  it('should send response with status 401 status code(wrong password)', (done)=>{
    //setup
    const body = {
      email: 'rafli@gmail.com',
      password: '12121212'
    }
    //execute
    request(app)
      .post('/login')
      .send(body)
      .end((err,res)=> {
        if (err) done(err)

        //Assert
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toEqual('Error')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('wrong email / password')

        done()
      })
  })

  it('should send response with status 401 status code(email not in db)', (done)=>{
    //setup
    const body = {
      email: 'rafli@gmail.com',
      password: '12121212'
    }
    //execute
    request(app)
      .post('/login')
      .send(body)
      .end((err,res)=> {
        if (err) done(err)

        //Assert
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toEqual('Error')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('wrong email / password')

        done()
      })
  })

  it('should send response with status 401 status code(email&password empty)', (done)=>{
    //setup
    const body = {
      email: 'rafli@gmail.com',
      password: '12121212'
    }
    //execute
    request(app)
      .post('/login')
      .send(body)
      .end((err,res)=> {
        if (err) done(err)

        //Assert
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toEqual('Error')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('wrong email / password')

        done()
      })
  })
})