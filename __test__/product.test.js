const request = require('supertest');
const app = require('../app');
const models = require('../models');

describe('Product', () => {
  let token = '';
  let idProduct = 0;

  beforeAll((done) => {
    request(app)
      .post('/users/login')
      .send({ email: 'admin@mail.com', password: '1234567890' })
      .end((err, res) => {
        if (err) done(err);

        token = 'Bearer ' + res.body.access_token;

        done();
      });
  });

  afterAll((done) => {
    models.sequelize.close();
    done();
  });

  it('Create Product without access token', (done) => {
    const body = {
      name: 'Cake',
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
    };

    request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'You must be logged in.' }])
        );

        done();
      });
  });

  it('Create product with empty name', (done) => {
    const body = {
      name: '',
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
      price: 100000,
      stock: 10,
      CategoryId: 1,
    };

    request(app)
      .post('/products')
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Name is required' }])
        );

        done();
      });
  });

  it('Create product with price value less than 0', (done) => {
    const body = {
      name: 'Cake',
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
      price: -1,
      stock: 10,
      CategoryId: 1,
    };

    request(app)
      .post('/products')
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Price must greater than 0' }])
        );

        done();
      });
  });

  it('Create product with stock value less than 0', (done) => {
    const body = {
      name: 'Cake',
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
      price: 100000,
      stock: -1,
      CategoryId: 1,
    };

    request(app)
      .post('/products')
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Stock must greater than 0' }])
        );

        done();
      });
  });

  it('Create product with valid inputs', (done) => {
    const body = {
      name: 'Cake',
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
      price: 100000,
      stock: 10,
      CategoryId: 1,
    };

    request(app)
      .post('/products')
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('id');
        expect(typeof res.body.id).toEqual('number');
        expect(res.body).toHaveProperty('name', body.name);
        expect(typeof res.body.image_url).toEqual('string');
        expect(res.body).toHaveProperty('image_url', body.image_url);
        expect(typeof res.body.price).toEqual('number');
        expect(res.body).toHaveProperty('price', body.price);
        expect(typeof res.body.stock).toEqual('number');
        expect(res.body).toHaveProperty('stock', body.stock);
        expect(typeof res.body.CategoryId).toEqual('number');
        expect(res.body).toHaveProperty('CategoryId', body.CategoryId);

        idProduct = res.body.id;

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
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
      price: 100000,
      stock: 10,
      CategoryId: 1,
    };

    request(app)
      .put(`/products/${idProduct}`)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'You must be logged in.' }])
        );

        done();
      });
  });

  it('Update product with invalid id product', (done) => {
    const body = {
      name: 'Cake',
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
      price: 100000,
      stock: 10,
      CategoryId: 1,
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
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Product not found' }])
        );

        done();
      });
  });

  it('Update product with empty name', (done) => {
    const body = {
      name: '',
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
      price: 100000,
      stock: 10,
      CategoryId: 1,
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
          expect.arrayContaining([{ message: 'Name is required' }])
        );

        done();
      });
  });

  it('Update product with price less than 0', (done) => {
    const body = {
      name: '',
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
      price: -1,
      stock: 10,
      CategoryId: 1,
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
          expect.arrayContaining([{ message: 'Price must greater than 0' }])
        );

        done();
      });
  });

  it('Update product with stock less than 0', (done) => {
    const body = {
      name: '',
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
      price: 100000,
      stock: -1,
      CategoryId: 1,
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
          expect.arrayContaining([{ message: 'Stock must greater than 0' }])
        );

        done();
      });
  });

  it('Update product with valid name', (done) => {
    const body = {
      name: 'Cake',
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
      price: 100000,
      stock: 10,
      CategoryId: 1,
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
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'You must be logged in.' }])
        );

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
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Product not found' }])
        );

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
