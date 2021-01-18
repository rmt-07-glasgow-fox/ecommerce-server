// const request = require('supertest');
// const app = require('../app');

// describe('Create Product', () => {
//   it('should send response with 201 status code', (done) => {
//     const body = {
//       name: 'Rainbow Cake',
//       image_url:
//         'https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/desktopimages/rainbow-cake600x600_2.jpg',
//       price: 100000,
//       stock: 20,
//       CategoryId: 1,
//     };

//     request(app)
//       .post('/products')
//       .send(body)
//       .end((err, res) => {
//         if (err) done(err);

//         expect(res.statusCode).toEqual(201);
//         expect(typeof res.body).toEqual('object');
//         expect(res.body).toHaveProperty('id');
//         expect(typeof res.body.id).toEqual('number');
//         expect(res.body).toHaveProperty('name', body.name);
//         expect(res.body).toHaveProperty('image_url', body.image_url);
//         expect(res.body).toHaveProperty('price', body.price);
//         expect(res.body).toHaveProperty('stock', body.stock);
//         expect(res.body).toHaveProperty('CategoryId', body.CategoryId);

//         done();
//       });
//   });

//   it('should send response with 400 status code', (done) => {
//     const body = {
//       name: '',
//       image_url: '',
//       price: 100000,
//       stock: 20,
//       CategoryId: 1,
//     };

//     request(app)
//       .post('/products')
//       .send(body)
//       .end((err, res) => {
//         if (err) done(err);

//         expect(res.statusCode).toEqual(400);
//         expect(typeof res.body).toEqual('object');
//         expect(res.body).toHaveProperty('errors');
//         expect(Array.isArray(res.body.errors)).toEqual(true);
//         expect(res.body.errors).toEqual(
//           expect.arrayContaining(['Name is required'])
//         );
//       });
//   });
// });
