const request = require('supertest')
const { clearCategory, generateToken } = require('../helpers')
const { sequelize, Product, Category } = require('../models')
const app = require('../app')
const admin_account = {
  id: 1,
  email: 'admin@gmail.com'
}
const fake_account = {
  id:2,
  email: 'bukanadmin@gmail.com'
}

describe('Products test', () => {
  let access_token
  let access_token2
  let categoryId
  let productId

  afterAll(done => {
    clearCategory()
    .then(() => {
      sequelize.close()
      done()
    })
  })
  
  beforeAll(done => {
    access_token = generateToken(admin_account)
    access_token2 = generateToken(fake_account)
    Category.create({
      "name": "otomotif",
      "UserId": 1
    }).then(data => {
      categoryId = data.id
      return Product.create({
        "name": "Nike",
        "image_url": "https://assets.adidas.com/images.jpg",
        "price": 100000,
        "stock": 10,
        "description": "Sepatu terbaik pokoknya",
        "CategoryId": data.id,
        "UserId": 1
      })
    }).then((data) => {
      productId = data.id
      done()
    })
  })
  it('Success ==> Success fetch all products, return 200 status code', (done) => {
    request(app)
      .get('/products')
      .set('access_token', access_token)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body))
        expect(res.body[0]).toHaveProperty('id')
        expect(res.body[0]).toHaveProperty('name')
        expect(res.body[0]).toHaveProperty('image_url')
        expect(res.body[0]).toHaveProperty('price')
        expect(res.body[0]).toHaveProperty('stock')
        expect(res.body[0]).toHaveProperty('description')
        expect(res.body[0]).toHaveProperty('UserId')
        expect(res.body[0]).toHaveProperty('CategoryId')
        expect(res.body[0]).toHaveProperty('Category')
        expect(typeof res.body[0].Category).toEqual('object')
        done()
      })
  })

  it('Fail ==> Without passing access token, return 400 status code', (done) => {
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

  it('Success add product, return 201 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": categoryId
    }
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body.name).toEqual(body.name)
        expect(res.body).toHaveProperty('image_url')
        expect(res.body.image_url).toEqual(body.image_url)
        expect(res.body).toHaveProperty('price')
        expect(res.body.price).toEqual(body.price)
        expect(res.body).toHaveProperty('stock')
        expect(res.body.stock).toEqual(body.stock)
        expect(res.body).toHaveProperty('description')
        expect(res.body.description).toEqual(body.description)
        expect(res.body).toHaveProperty('CategoryId')
        expect(res.body.CategoryId).toEqual(body.CategoryId)
        done()
      })
  })

  it('Without passing access token, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": categoryId
    }
    request(app)
      .post('/products')
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
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": categoryId
    }
    request(app)
      .post('/products')
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
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": categoryId
    }
    request(app)
      .post('/products')
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

  it('Stock filled by minus number, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": -10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": categoryId
    }
    request(app)
      .post('/products')
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

  it('Price filled by minus number, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": -100000,
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": categoryId
    }
    request(app)
      .post('/products')
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

  it('Invalid data type, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": "satu juta",
      "stock": 10,
      "description": "Sepatu terbaik pokoknya",
      "CategoryId": categoryId
    }
    request(app)
      .post('/products')
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

  it('Success update product, return 200 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": categoryId
    }
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(typeof res).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body.name).toEqual(body.name)
        expect(res.body).toHaveProperty('image_url')
        expect(res.body.image_url).toEqual(body.image_url)
        expect(res.body).toHaveProperty('price')
        expect(res.body.price).toEqual(body.price)
        expect(res.body).toHaveProperty('stock')
        expect(res.body.stock).toEqual(body.stock)
        expect(res.body).toHaveProperty('description')
        expect(res.body.description).toEqual(body.description)
        expect(res.body).toHaveProperty('CategoryId')
        expect(res.body.CategoryId).toEqual(body.CategoryId)
        done()
      })
  })

  it('Without passing access token, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": categoryId
    }
    request(app)
      .put(`/products/${productId}`)
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

  it('Invalid access token, return 401 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": categoryId
    }
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token2)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })

  it('Required column not filled, return 400 status code', (done) => {
    const body = {
      "name": "",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": categoryId
    }
    request(app)
      .put(`/products/${productId}`)
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

  it('Invalid data type, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": "Sepuluh juta",
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": categoryId
    }
    request(app)
      .put(`/products/${productId}`)
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

  it('Stock filled by minus number, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": -10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": categoryId
    }
    request(app)
      .put(`/products/${productId}`)
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

  it('Price filled by minus number, return 400 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": -100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": categoryId
    }
    request(app)
      .put(`/products/${productId}`)
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

  it('Invalid product Id, return 404 status code', (done) => {
    const body = {
      "name": "Nike",
      "image_url": "https://assets.adidas.com/images.jpg",
      "price": 100000,
      "stock": 10,
      "description": "Name nya Nike imagenya Adidas :))",
      "CategoryId": categoryId
    }
    request(app)
      .put(`/products/1000000`)
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })

  it('Without passing access token, return 400 status code', (done) => {
    request(app)
      .delete(`/products/${productId}`)
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
      .delete(`/products/${productId}`)
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

  it('Invalid productId, return 404 status code', (done) => {
    request(app)
      .delete(`/products/1000000`)
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
      .delete(`/products/${productId}`)
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

// describe('POST /products ==> Success', () => {
  
// })

// describe('POST /products ==> Failed', () => {
  
// })

// describe('PUT /products ==> Success', () => {
  
// })


// describe('PUT /products ==> Failed', () => {
  
// })

// describe('DELETE /products ==> Failed', () => {
  
// })

// describe('DELETE /products ==> Success', () => {
  
// })

