const request = require('supertest');
const app = require('../app.js');
const models = require('../models/index.js');
const clearProduct = require('./helpers/testClearProduct.js');
const clearUser = require('./helpers/testClearUser.js');
const { chkToken } = require('../helpers/jwt.js');

describe('Product Test Suite', () => {
  let ProductId = 0;
  let access_token = '';
  let UserId = 0;
  let wrong_access_token = '';
  let wrong_UserId = 0;

  beforeAll(done => {
    request(app)
      .post('/register')
      .send({ firstname: 'William', lastname: 'Smith', email: 'williamsmith@mail.com', password: '123456' })
      .end((err, res) => {
        if (err) done(err);
      });
    request(app)
      .post('/login')
      .send({ email: 'williamsmith@mail.com', password: '123456' })
      .end((err, res) => {
        if (err) done(err);

        wrong_access_token = res.body.access_token;

        const genID = chkToken(wrong_access_token);

        wrong_UserId = genID.id;
      });
    request(app)
      .post('/login')
      .send({ email: 'admin@mail.com', password: '1234' })
      .end((err, res) => {
        if (err) done(err);

        access_token = res.body.access_token;

        const genID = chkToken(access_token);

        UserId = genID.id;

        done();
      });
  });
  afterAll(done => {
    clearUser('johndoe@mail.com')
      .then(() => {
        models.sequelize.close();
        done()
      })
      .catch(err => console.log(err));
  });

  describe('POST /product', () => {
    it('should send response with 201 status code if success created', (done) => {
      // SETUP
      const body = {
        name: 'Touhou 6: Embodiment of Scarlet Devil',
        image_url: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Th06cover.jpg',
        price: 250000,
        stock: 150,
        CategoryId: 13,
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          ProductId = res.body.id;
          // ASSERT
          expect(res.statusCode).toEqual(201);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('id');
          expect(typeof res.body.id).toEqual('number');
          expect(res.body).toHaveProperty('name');
          expect(res.body.name).toEqual(body.name);
          expect(res.body).toHaveProperty('image_url');
          expect(res.body.image_url).toEqual(body.image_url);
          expect(res.body).toHaveProperty('price');
          expect(res.body.price).toEqual(body.price);
          expect(typeof res.body.price).toEqual('number');
          expect(res.body).toHaveProperty('stock');
          expect(res.body.stock).toEqual(body.stock);
          expect(typeof res.body.stock).toEqual('number');
          expect(res.body).toHaveProperty('CategoryId');
          expect(res.body.CategoryId).toEqual(body.CategoryId);
          expect(typeof res.body.CategoryId).toEqual('number');
          expect(res.body).toHaveProperty('UserId');
          expect(res.body.UserId).toEqual(body.UserId);
          expect(typeof res.body.UserId).toEqual('number');

          done();
        });
    });
    it('should send response with 401 status code if access_token is missing', (done) => {
      // SETUP
      const body = {
        name: 'Touhou 6: Embodiment of Scarlet Devil',
        image_url: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Th06cover.jpg',
        price: 250000,
        stock: 150,
        CategoryId: 13,
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .end((err, res) => {
          if (err) done(err);

          // ASSERT
          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual(('Please login first!'));

          done();
        });
    });
    it('should send response with 401 status code if access_token is wrong', (done) => {
      // SETUP
      const body = {
        name: 'Touhou 6: Embodiment of Scarlet Devil',
        image_url: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Th06cover.jpg',
        price: 250000,
        stock: 150,
        CategoryId: 13,
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .set({ access_token: 'wrongaccesstoken' })
        .end((err, res) => {
          if (err) done(err);

          // ASSERT
          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual(('Please login first!'));

          done();
        });
    });
    it('should send response with 401 status code if access_token is right but have no authorization', (done) => {
      // SETUP
      const body = {
        name: 'Touhou 6: Embodiment of Scarlet Devil',
        image_url: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Th06cover.jpg',
        price: 250000,
        stock: 150,
        CategoryId: 13,
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .set({ access_token: wrong_access_token })
        .end((err, res) => {
          if (err) done(err);

          // ASSERT
          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual(('You don\'t have authorization to do this task.'));

          done();
        });
    });
    it('should send response with 400 status code if all fields are empty', (done) => {
      // SETUP
      const body = {
        name: '',
        image_url: '',
        price: 0,
        stock: 0,
        CategoryId: 0,
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          // ASSERT
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(expect.arrayContaining(['Please insert product name!']));
          expect(res.body.errors).toEqual(expect.arrayContaining(['The length of product name must be less than 50 characters.']));
          expect(res.body.errors).toEqual(expect.arrayContaining(['Please insert product image!']));

          done();
        });
    });
    it('should send response with 400 status code if name field is empty', (done) => {
      // SETUP
      const body = {
        name: '',
        image_url: 'https://img.url.com/',
        price: 0,
        stock: 0,
        CategoryId: 5,
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          // ASSERT
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(expect.arrayContaining(['Please insert product name!']));
          expect(res.body.errors).toEqual(expect.arrayContaining(['The length of product name must be less than 50 characters.']));

          done();
        });
    });
    it('should send response with 400 status code if name field more than 50 characters', (done) => {
      // SETUP
      const body = {
        name: 'aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz00112233445566778899',
        image_url: 'https://img.url.com/',
        price: 0,
        stock: 0,
        CategoryId: 5,
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          // ASSERT
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(expect.arrayContaining(['The length of product name must be less than 50 characters.']));

          done();
        });
    });
    it('should send response with 400 status code if image url field is empty', (done) => {
      // SETUP
      const body = {
        name: 'name',
        image_url: '',
        price: 1,
        stock: 1,
        CategoryId: 5,
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          // ASSERT
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(expect.arrayContaining(['Please insert product image!']));

          done();
        });
    });
    it('should send response with 400 status code if price and stock field is filled with other than numeric', (done) => {
      // SETUP
      const body = {
        name: 'name',
        image_url: 'https://img.url.com/',
        price: 'price',
        stock: 'stock',
        CategoryId: 5,
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          // ASSERT
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(expect.arrayContaining(['Only numeric input is allowed for price!']));
          expect(res.body.errors).toEqual(expect.arrayContaining(['Only numeric input is allowed for stock!']));

          done();
        });
    });
    it('should send response with 400 status code if price and stock field is filled with minus numeric', (done) => {
      // SETUP
      const body = {
        name: 'name',
        image_url: 'https://img.url.com/',
        price: -5,
        stock: -420,
        CategoryId: 5,
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          // ASSERT
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(expect.arrayContaining(['Minimal price is Rp.0.']));
          expect(res.body.errors).toEqual(expect.arrayContaining(['Minimal stock is 0.']));

          done();
        });
    });
    it('should send response with 400 status code if category field is filled with other than numeric', (done) => {
      // SETUP
      const body = {
        name: 'name',
        image_url: 'https://img.url.com/',
        price: 10,
        stock: 10,
        CategoryId: 'rpg',
        UserId,
      };
      // EXECUTE
      request(app)
        .post('/product')
        .send(body)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          // ASSERT
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(expect.arrayContaining(['Invalid category.']));

          done();
        });
    });
  });

  describe('GET /product', () => {
    it('should send response with 200 status code if success get without access_token', (done) => {
      // SETUP

      // EXECUTE
      request(app)
        .get('/product')
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(200);
          expect(Array.isArray(res.body)).toEqual(true);

          done()
        });
    });
    it('should send response with 200 status code if success get with access_token', (done) => {
      // SETUP

      // EXECUTE
      request(app)
        .get('/product')
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(200);
          expect(Array.isArray(res.body)).toEqual(true);

          done()
        });
    });
  });

  describe('GET /product/:id', () => {
    it('should send response with 200 status code if success get with access_token', (done) => {
      // SETUP

      // EXECUTE
      request(app)
        .get(`/product/${ProductId}`)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('id');
          expect(typeof res.body.id).toEqual('number');
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('image_url');
          expect(res.body).toHaveProperty('price');
          expect(typeof res.body.price).toEqual('number');
          expect(res.body).toHaveProperty('stock');
          expect(typeof res.body.stock).toEqual('number');
          expect(res.body).toHaveProperty('CategoryId');
          expect(typeof res.body.CategoryId).toEqual('number');

          done()
        });
    });
    it('should send response with 401 status code if without access_token', (done) => {
      // SETUP

      // EXECUTE
      request(app)
        .get(`/product/${ProductId}`)
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual('Please login first!');

          done()
        });
    });
    it('should send response with 404 status code if data is not exist', (done) => {
      // SETUP

      // EXECUTE
      request(app)
        .get(`/product/0`)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(404);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual('Product is not found.');

          done()
        });
    });
  });

  describe('PUT /product/:id', () => {
    it('should send response with 200 status code if success updated', (done) => {
      // SETUP
      const body = {
        name: 'Touhou 6: Embodiment of Scarlet Devil',
        image_url: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Th06cover.jpg',
        price: 50000,
        stock: 1500,
        CategoryId: 13,
        UserId,
      };
      // EXECUTE
      request(app)
        .put(`/product/${ProductId}`)
        .send(body)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('id');
          expect(typeof res.body.id).toEqual('number');
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('image_url');
          expect(res.body).toHaveProperty('price');
          expect(typeof res.body.price).toEqual('number');
          expect(res.body).toHaveProperty('stock');
          expect(typeof res.body.stock).toEqual('number');
          expect(res.body).toHaveProperty('CategoryId');
          expect(typeof res.body.CategoryId).toEqual('number');

          done()
        });
    });
    it('should send response with 401 status code if no access_token', (done) => {
      // SETUP
      const body = {
        name: 'Touhou 6: Embodiment of Scarlet Devil',
        image_url: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Th06cover.jpg',
        price: 50000,
        stock: 1500,
        CategoryId: 13,
        UserId,
      };
      // EXECUTE
      request(app)
        .put(`/product/${ProductId}`)
        .send(body)
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual(('Please login first!'));

          done()
        });
    });
    it('should send response with 401 status code if access_token has no authorization', (done) => {
      // SETUP
      const body = {
        name: 'Touhou 6: Embodiment of Scarlet Devil',
        image_url: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Th06cover.jpg',
        price: 50000,
        stock: 1500,
        CategoryId: 13,
        UserId,
      };
      // EXECUTE
      request(app)
        .put(`/product/${ProductId}`)
        .send(body)
        .set({ access_token: wrong_access_token })
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual(('You don\'t have authorization to do this task.'));

          done()
        });
    });
    it('should send response with 404 status code if data is not exist', (done) => {
      // SETUP
      const body = {
        name: 'Touhou 6: Embodiment of Scarlet Devil',
        image_url: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Th06cover.jpg',
        price: 50000,
        stock: 1500,
        CategoryId: 13,
        UserId,
      };
      // EXECUTE
      request(app)
        .put(`/product/0`)
        .send(body)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(404);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual('Product is not found.');

          done()
        });
    });
  });

  describe('DELETE /product/:id', () => {
    it('should send response with 200 status code if success deleted', (done) => {
      // SETUP

      // EXECUTE
      request(app)
        .delete(`/product/${ProductId}`)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toEqual('Product has been deleted.');

          done()
        });
    });
    it('should send response with 401 status code if no access_token', (done) => {
      // SETUP

      // EXECUTE
      request(app)
        .put(`/product/${ProductId}`)
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual(('Please login first!'));

          done()
        });
    });
    it('should send response with 401 status code if access_token has no authorization', (done) => {
      // SETUP

      // EXECUTE
      request(app)
        .put(`/product/${ProductId}`)
        .set({ access_token: wrong_access_token })
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual(('You don\'t have authorization to do this task.'));

          done()
        });
    });
    it('should send response with 404 status code if data is not exist', (done) => {
      // SETUP

      // EXECUTE
      request(app)
        .delete(`/product/${ProductId}`)
        .set({ access_token })
        .end((err, res) => {
          if (err) done(err);

          expect(res.statusCode).toEqual(404);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toEqual('Product is not found.');

          done()
        });
    });
  });
});

