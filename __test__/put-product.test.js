// const request = require('supertest')
// const app = require('../app')
// const { User } = require('../models')
// const { generateToken } = require('../helpers/jwt')
// const clearProducts = require('./helpers/clear-products')
// const models = require('../models')

// describe('PUT /products API should be working', function() {
//   let access_token

//   beforeAll(done => {
//     User.findOne({where: {email: 'admin@mail.com'}})
//       .then(user => {
//         const payload = { id: user.id, email: user.email }
//         access_token = generateToken(payload)
//         done()
//       })
//   })

//   afterAll(done => {
//     clearProducts()
//     .then(function() {
//       models.sequelize.close()
//       done()
//     })
//     .catch(console.log)
//   })
  
//   it('should response with 200 status code', function(done) {
//     let body = {
//       name: 'JBL Endurance Run - Putih',
//       image_url: 'https://ecs7.tokopedia.net/img/cache/900/product-1/2020/9/29/910865/910865_a716d488-44e5-41b8-a9bb-d7cdf8e9c2c4_2048_2048',
//       price: 150000,
//       stock: 50,
//     }

//     request(app)
//       .put('/products/1')
//       .send(body)
//       .set('access_token', access_token)
//       .end(function(err, res) {
//         if(err) done(err)

//         expect(res.statusCode).toEqual(200)
//         expect(typeof res.body).toEqual('object')
//         expect(res.body).toHaveProperty('id')
//         expect(typeof res.body.id).toEqual('number')
//         expect(res.body).toHaveProperty('name')
//         expect(res.body.name).toEqual(body.name)
//         expect(res.body).toHaveProperty('image_url')
//         expect(res.body.image_url).toEqual(body.image_url)
//         expect(res.body).toHaveProperty('price')
//         expect(res.body.price).toEqual(body.price)
//         expect(res.body).toHaveProperty('stock')
//         expect(res.body.stock).toEqual(body.stock)

//         done()
//       })
//   })

// })
