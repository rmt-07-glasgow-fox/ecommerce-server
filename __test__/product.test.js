const path = require('path');
const request = require('supertest');
const app = require('../app');
const models = require('../models');

describe('Product', () => {
  let token = '';
  let idProduct = 0;
  let idCategory = 0;
  let image_url = '';
  let image_name = '';

  beforeAll((done) => {
    request(app)
      .post('/users/login')
      .send({ email: 'admin@mail.com', password: '1234567890' })
      .end((err, res) => {
        if (err) done(err);

        token = 'Bearer ' + res.body.access_token;

        request(app)
          .post('/categories')
          .send({
            name: 'Cake',
          })
          .set({ authorization: token })
          .end((err1, res1) => {
            if (err1) done(err1);

            idCategory = res1.body.id;
            done();
          });
      });
  });

  afterAll((done) => {
    request(app)
      .delete(`/categories/${idCategory}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        models.sequelize.close();
        done();
      });
  });

  it('Create Product without access token', (done) => {
    request(app)
      .post('/products')
      .field('name', 'Cake')
      .field('price', 10000)
      .field('stock', 10)
      .field('CategoryId', idCategory)
      .attach('image', path.resolve(__dirname, 'images/hacktiv8logo.png'))
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'You must be logged in.' }]));

        done();
      });
  });

  it('Create product with empty name', (done) => {
    request(app)
      .post('/products')
      .field('name', '')
      .field('price', 10000)
      .field('stock', 10)
      .field('CategoryId', idCategory)
      .attach('image', path.resolve(__dirname, 'images/hacktiv8logo.png'))
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'Name is required' }]));

        done();
      });
  });

  it('Create product with price value less than 0', (done) => {
    request(app)
      .post('/products')
      .field('name', 'Cake')
      .field('price', -1)
      .field('stock', 10)
      .field('CategoryId', idCategory)
      .attach('image', path.resolve(__dirname, 'images/hacktiv8logo.png'))
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Price must greater than 0' }]),
        );

        done();
      });
  });

  it('Create product with stock value less than 0', (done) => {
    request(app)
      .post('/products')
      .field('name', 'Cake')
      .field('price', 10000)
      .field('stock', -1)
      .field('CategoryId', idCategory)
      .attach('image', path.resolve(__dirname, 'images/hacktiv8logo.png'))
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Stock must greater than 0' }]),
        );

        done();
      });
  });

  it('Create product with valid inputs', (done) => {
    request(app)
      .post('/products')
      .field('name', 'Cake')
      .field('price', 10000)
      .field('stock', 10)
      .field('CategoryId', idCategory)
      .attach('image', path.resolve(__dirname, 'images/hacktiv8logo.png'))
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('id');
        expect(typeof res.body.id).toEqual('number');
        expect(res.body).toHaveProperty('name', 'Cake');
        expect(typeof res.body.image_url).toEqual('string');
        expect(res.body).toHaveProperty('image_url');
        expect(typeof res.body.image_name).toEqual('string');
        expect(res.body).toHaveProperty('image_name');
        expect(typeof res.body.price).toEqual('number');
        expect(res.body).toHaveProperty('price', 10000);
        expect(typeof res.body.stock).toEqual('number');
        expect(res.body).toHaveProperty('stock', 10);
        expect(typeof res.body.CategoryId).toEqual('number');
        expect(res.body).toHaveProperty('CategoryId', idCategory);

        idProduct = res.body.id;
        image_name = res.body.image_name;
        image_url = res.body.image_url;

        done();
      });
  });

  it('Get all products', (done) => {
    request(app)
      .get('/products')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);

        done();
      });
  });

  it('Update product without access token', (done) => {
    const body = {
      name: 'Cake',
      image_url: image_url,
      image_name: image_name,
      price: 100000,
      stock: 10,
      CategoryId: idCategory,
    };

    request(app)
      .put(`/products/${idProduct}`)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'You must be logged in.' }]));

        done();
      });
  });

  it('Update product with invalid id product', (done) => {
    const body = {
      name: 'Cake',
      image_url: image_url,
      image_name: image_name,
      price: 100000,
      stock: 10,
      CategoryId: idCategory,
    };

    request(app)
      .put(`/products/0`)
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'Product not found' }]));

        done();
      });
  });

  it('Update product with empty name', (done) => {
    const body = {
      name: '',
      image_url: image_url,
      image_name: image_name,
      price: 100000,
      stock: 10,
      CategoryId: idCategory,
    };

    request(app)
      .put(`/products/${idProduct}`)
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'Name is required' }]));

        done();
      });
  });

  it('Update product with price less than 0', (done) => {
    const body = {
      name: 'Cake',
      image_url: image_url,
      image_name: image_name,
      price: -1,
      stock: 10,
      CategoryId: idCategory,
    };

    request(app)
      .put(`/products/${idProduct}`)
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Price must greater than 0' }]),
        );

        done();
      });
  });

  it('Update product with stock less than 0', (done) => {
    const body = {
      name: 'Cake',
      image_url: image_url,
      image_name: image_name,
      price: 100000,
      stock: -1,
      CategoryId: idCategory,
    };

    request(app)
      .put(`/products/${idProduct}`)
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Stock must greater than 0' }]),
        );

        done();
      });
  });

  it('Update product with valid name', (done) => {
    const body = {
      name: 'Cake',
      image_url: image_url,
      image_name: image_name,
      price: 100000,
      stock: 10,
      CategoryId: idCategory,
    };

    request(app)
      .put(`/products/${idProduct}`)
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([1]));

        done();
      });
  });

  it('Delete product without access token', (done) => {
    request(app)
      .delete(`/products/${idProduct}`)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'You must be logged in.' }]));

        done();
      });
  });

  it('Delete product with invalid id product', (done) => {
    request(app)
      .delete(`/products/0`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'Product not found' }]));

        done();
      });
  });

  it('Delete product with valid id product', (done) => {
    request(app)
      .delete(`/products/${idProduct}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('message', 'Product has been deleted');

        done();
      });
  });
});
