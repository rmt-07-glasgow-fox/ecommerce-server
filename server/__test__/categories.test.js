const request = require('supertest')
const { generateToken, clearCategory } = require('../helpers')
const { Category, sequelize } = require('../models')
const app = require('../app')
const admin_account = {
  id: 1,
  email: 'admin@gmail.com'
}
const fake_account = {
  id:2,
  email: 'bukanadmin@gmail.com'
}

describe('Categories test', () => {
  let access_token
  let access_token2
  let categoryId


  beforeAll(done => {
    access_token = generateToken(admin_account)
    access_token2 = generateToken(fake_account)
    Category.create({
      "name": "test category",
      "UserId": 1
    }).then(data => {
      categoryId = data.id
      done()
    })
  })

  afterAll(done => {
    clearCategory()
    .then(() => {
      sequelize.close()
      done()
    })
  })

  it('Success add categories, return 201 status code', (done) => {
    const body = {
      "name": "elektronik",
      "UserId": 1
    }
    request(app)
      .post('/categories')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body.name).toEqual(body.name)
        expect(res.body).toHaveProperty('UserId')
        expect(res.body.UserId).toEqual(body.UserId)
        done ()
      })
  })

  it('Without passing access token, return 400 status code', (done) => {
    const body = {
      "name": "komputer",
      "UserId": 1
    }
    request(app)
      .post('/categories')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Invalid access token, return 401 status code', (done) => {
    const body = {
      "name": "fashion",
      "UserId": 1
    }
    request(app)
      .post('/categories')
      .set('access_token', access_token2)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Required column not filled, return 400 status code', (done) => {
    const body = {
      "name": "",
      "UserId": 1
    }
    request(app)
      .post('/categories')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Post with name has been taken, return 400 status code', (done) => {
    Category.create({
      "name": "sepatu",
      "UserId": 1
    }).then(() => {
      const body = {
        "name": "sepatu",
        "UserId": 1
      }
      request(app)
        .post('/categories')
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
          if(err) done(err)
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(Array.isArray(res.body.message))
          done()
        })
    })
  })

  it('Success fetch all banners, return 200 status code', (done) => {
    request(app)
      .get('/categories')
      .set('access_token', access_token)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body))
        expect(res.body[0]).toHaveProperty('id')
        expect(res.body[0]).toHaveProperty('name')
        expect(res.body[0]).toHaveProperty('UserId')
        expect(res.body[0]).toHaveProperty('Products')
        expect(typeof res.body[0].Products).toEqual('object')
        done()
      })
  })

  it('Fetch without passing access token, return 400 status code', (done) => {
    request(app)
      .get('/products')
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Delete without passing access token, return 400 status code', (done) => {
    request(app)
      .delete(`/categories/${categoryId}`)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Invalid access token, return 401 status code', (done) => {
    request(app)
      .delete(`/categories/${categoryId}`)
      .set('access_token', access_token2)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })

  it('Invalid category Id, return 404 status code', (done) => {
    request(app)
      .delete(`/categories/10000000`)
      .set('access_token', access_token)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })

  it('Success delete product, return 200 status code', (done) => {
    request(app)
      .delete(`/categories/${categoryId}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})
