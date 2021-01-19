const request = require('supertest')
const app = require('../app')
const clearProducts = require('./helpers/clear-products')

let token = null

// CREATE PRODUCT

// Success test cases

// describe("POST /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "admin@mail.com",
//       password: "123456",
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   afterAll((done) => {
//     clearProducts()
//       .then(() => {
//         done()
//       })
//       .catch(console.log)
//   })

//   it('should send response with 201 status code', (done) => {
//     const body = {
//       name: 'google',
//       image_url: 'https://www.gooogle.com',
//       price: 100000,
//       stock: 122,
//       UserId: 2
//     }

//     request(app) 
//       .post('/products')
//       .send(body)
//       .set('access_token', token)
//       .end((err, res) => {
//         if(err) done(err)

//         expect(res.statusCode).toEqual(201)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('name')
//         expect(res.body).toHaveProperty('image_url')
//         expect(res.body).toHaveProperty('price')
//         expect(res.body).toHaveProperty('stock')
//         done()
//       })
//   })
// })

// // tidak menyertakan access_token

// describe("POST /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "admin@mail.com",
//       password: "123456"
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   it('should send response with 400 status code  (jwt must be provided)', (done) => {
//     const body = {
//       name: 'google',
//       image_url: 'https://www.gooogle.com',
//       price: 10000,
//       stock: 122,
//       UserId: 2
//     }

//     request(app) 
//       .post('/products')
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)

//         expect(res.statusCode).toEqual(400)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('message')
//         expect(res.body.message).toEqual('jwt must be provided')
//         expect(typeof res.body.message).toEqual('string')
//         done()
//       })
//   })
// })

// // menyertakan access_token tapi bukan punya admin

// describe("POST /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "user@mail.com",
//       password: "123456",
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   // afterAll((done) => {
//   //   clearProducts()
//   //     .then(() => {
//   //       done()
//   //     })
//   //     .catch(console.log)
//   // })

//   it('should send response with 401 status code', (done) => {
//     const body = {
//       name: 'google',
//       image_url: 'https://www.gooogle.com',
//       price: 10000,
//       stock: 122
//     }

//     request(app) 
//       .post('/products')
//       .send(body)
//       .set('access_token', token)
//       .end((err, res) => {
//         if(err) done(err)

//         expect(res.statusCode).toEqual(401)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('message')
//         expect(res.body.message).toEqual('Unauthorized')
//         expect(typeof res.body.message).toEqual('string')
//         done()
//       })
//   })
// })

// // field yang required tidak diisi

// describe("POST /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "admin@mail.com",
//       password: "123456",
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   // afterAll((done) => {
//   //   clearProducts()
//   //     .then(() => {
//   //       done()
//   //     })
//   //     .catch(console.log)
//   // })

//   it('should send response with 400 status code', (done) => {
//     const body = {
//       name: '',
//       image_url: 'https://www.gooogle.com',
//       price: 10000,
//       stock: 122
//     }

//     request(app) 
//       .post('/products')
//       .send(body)
//       .set('access_token', token)
//       .end((err, res) => {
//         if(err) done(err)

//         expect(res.statusCode).toEqual(400)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('message')
//         expect(res.body.message).toEqual('Name is required')
//         expect(typeof res.body.message).toEqual('string')
//         done()
//       })
//   })
// })

// // stock diisi angka minus

// describe("POST /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "admin@mail.com",
//       password: "123456",
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   // afterAll((done) => {
//   //   clearProducts()
//   //     .then(() => {
//   //       done()
//   //     })
//   //     .catch(console.log)
//   // })

//   it('should send response with 400 status code', (done) => {
//     const body = {
//       name: 'google',
//       image_url: 'https://www.gooogle.com',
//       price: 10000,
//       stock: -5
//     }

//     request(app) 
//       .post('/products')
//       .send(body)
//       .set('access_token', token)
//       .end((err, res) => {
//         if(err) done(err)

//         expect(res.statusCode).toEqual(400)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('message')
//         expect(res.body.message).toEqual('cannot be less than zero or a negative number')
//         expect(typeof res.body.message).toEqual('string')
//         done()
//       })
//   })
// })

// // price diisi angka minus

// describe("POST /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "admin@mail.com",
//       password: "123456",
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   // afterAll((done) => {
//   //   clearProducts()
//   //     .then(() => {
//   //       done()
//   //     })
//   //     .catch(console.log)
//   // })

//   it('should send response with 400 status code', (done) => {
//     const body = {
//       name: 'google',
//       image_url: 'https://www.gooogle.com',
//       price: -100,
//       stock: 6
//     }

//     request(app) 
//       .post('/products')
//       .send(body)
//       .set('access_token', token)
//       .end((err, res) => {
//         if(err) done(err)

//         expect(res.statusCode).toEqual(400)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('message')
//         expect(res.body.message).toEqual('cannot be less than zero or a negative number')
//         expect(typeof res.body.message).toEqual('string')
//         done()
//       })
//   })
// })

// UPDATE PRODUCT

// Success test case

// describe("PUT /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "admin@mail.com",
//       password: "123456",
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   it('should send response with 200 status code', (done) => {
//     const body = {
//       name: 'gulajawa',
//       image_url: 'https://www.facebook.com',
//       price: 90000,
//       stock: 45
//     }
//     request(app) 
//       .put('/products/109')
//       .send(body)
//       .set('access_token', token)
//       .end((err, res) => {
//         if(err) done(err)


//         expect(res.statusCode).toEqual(200)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body[1][0]).toHaveProperty('name')
//         expect(res.body[1][0]).toHaveProperty('image_url')
//         expect(res.body[1][0]).toHaveProperty('price')
//         expect(res.body[1][0]).toHaveProperty('stock')
//         done()
//       })
//   })
// })

// tidak menyertakan akses token

// describe("PUT /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "admin@mail.com",
//       password: "123456",
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   it('should send response with 400 status code', (done) => {
//     const body = {
//       name: 'gulajawa',
//       image_url: 'https://www.facebook.com',
//       price: 90000,
//       stock: 45
//     }
//     request(app) 
//       .put('/products/109')
//       .send(body)
//       // .set('access_token', token)
//       .end((err, res) => {
//         if(err) done(err)

//         console.log(res.body)

//         expect(res.statusCode).toEqual(400)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('message')
//         expect(typeof res.body.message).toEqual('string')
//         expect(res.body.message).toEqual('jwt must be provided')
//         done()
//       })
//   })
// })

// menyertakan access_token tapi bukan punya admin

// describe("PUT /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "admin@mail.com",
//       password: "123456",
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   it('should send response with 400 status code', (done) => {
//     const body = {
//       name: 'gulajawa',
//       image_url: 'https://www.facebook.com',
//       price: 90000,
//       stock: 45
//     }
//     request(app) 
//       .put('/products/109')
//       .send(body)
//       .set('access_token', 'bukanpunyadmin')
//       .end((err, res) => {
//         if(err) done(err)

//         console.log(res.body)

//         expect(res.statusCode).toEqual(400)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('message')
//         expect(typeof res.body.message).toEqual('string')
//         expect(res.body.message).toEqual('jwt malformed')
//         done()
//       })
//   })
// })

// stock diisi angka minus

// describe("PUT /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "admin@mail.com",
//       password: "123456",
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   it('should send response with 400 status code', (done) => {
//     const body = {
//       name: 'gulajawa',
//       image_url: 'https://www.facebook.com',
//       price: 90000,
//       stock: -45
//     }
//     request(app) 
//       .put('/products/109')
//       .send(body)
//       .set('access_token', token)
//       .end((err, res) => {
//         if(err) done(err)

//         console.log(res.body)

//         expect(res.statusCode).toEqual(400)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('message')
//         expect(typeof res.body.message).toEqual('string')
//         expect(res.body.message).toEqual('cannot be less than zero or a negative number')
//         done()
//       })
//   })
// })

// price diisi angka minus

// describe("PUT /products", () => {
//   beforeAll((done) => {
//     const body = {
//       email: "admin@mail.com",
//       password: "123456",
//     }
//     request(app)
//       .post("/users/login")
//       .send(body)
//       .end((err, res) => {
//         if(err) done(err)
//         token = res.body.access_token
//         done()
//       })
//   })

//   it('should send response with 200 status code', (done) => {
//     const body = {
//       name: 'gulajawa',
//       image_url: 'https://www.facebook.com',
//       price: -999,
//       stock: 45
//     }
//     request(app) 
//       .put('/products/109')
//       .send(body)
//       .set('access_token', token)
//       .end((err, res) => {
//         if(err) done(err)

//         console.log(res.body)

//         expect(res.statusCode).toEqual(400)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('message')
//         expect(typeof res.body.message).toEqual('string')
//         expect(res.body.message).toEqual('cannot be less than zero or a negative number')
//         done()
//       })
//   })
// })

// DELETE PRODUCT

// Success test cases 

describe("DELETE /products", () => {
  beforeAll((done) => {
    const body = {
      email: "admin@mail.com",
      password: "123456",
    }
    request(app)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        token = res.body.access_token
        done()
      })
  })

  it('should send response with 200 status code', (done) => {
    const body = {
      name: 'gulajawa',
      image_url: 'https://www.facebook.com',
      price: -999,
      stock: 45
    }
    request(app) 
      .delete('/products/109')
      .send(body)
      .set('access_token', token)
      .end((err, res) => {
        if(err) done(err)

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        expect(res.body.message).toEqual('Product has been deleted')
        done()
      })
  })
})

// menyertakan access_token tapi bukan punya admin

describe("DELETE /products", () => {
  beforeAll((done) => {
    const body = {
      email: "admin@mail.com",
      password: "123456",
    }
    request(app)
      .post("/users/login")
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        token = res.body.access_token
        done()
      })
  })

  it('should send response with 200 status code', (done) => {
    const body = {
      name: 'gulajawa',
      image_url: 'https://www.facebook.com',
      price: -999,
      stock: 45
    }
    request(app) 
      .delete('/products/109')
      .send(body)
      .set('access_token', 'bukanpunyadmin')
      .end((err, res) => {
        if(err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        expect(res.body.message).toEqual('jwt malformed')
        done()
      })
  })
})





