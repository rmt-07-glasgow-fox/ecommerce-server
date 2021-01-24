const request = require('supertest');
const app = require('../app');

const clearProduct = require('./helpers/clear-product');
const models = require('../models')

let tokenAdmin, tokenCustomer, productId;

beforeAll(async(done) => {
  const admin = {
    email: 'admin@mail.com',
    password: '1234'
  }

  const customer = {
    email: 'pevitapearce@gmail.com',
    password: 'qwerty'
  }

  const admins = await request(app)
    .post('/login')
    .send(admin)

  tokenAdmin = admins.body.access_token;

  const customers = await request(app)
    .post('/login')
    .send(customer)

  tokenCustomer = customers.body.access_token;

  done();
});

afterAll(async(done) => {
  try {
    await clearProduct();
    await models.sequelize.close();
    done();

  } catch (error) {
    console.log(error);
  }
})

describe('POST /products', () => {
  it('should send response with 201 status code', (done) => {
    //Setup
    const body = {
      name: 'Air Jordan 4',
      image_url: 'image.jpg',
      price: 2000000,
      stock: 10,
      categoryId: 1
    }

    // EXECUTE
    request(app)
      .post('/products')
      .set('access_token', tokenAdmin)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        productId = res.body.id
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
        expect(res.body).toHaveProperty('stock');
        expect(res.body.stock).toEqual(body.stock);
        expect(res.body).toHaveProperty('categoryId');
        expect(res.body.categoryId).toEqual(body.categoryId);
        expect(res.body).toHaveProperty('userId');

        done();
      });
  });


  it('unauthorize action role not admin should send response with 401 status code', (done) => {
    //Setup
    const body = {
      name: 'Air Jordan 4',
      image_url: 'image.jpg',
      price: 2000000,
      stock: 10,
      categoryId: 1
    }

    // EXECUTE
    request(app)
      .post('/products')
      .set('access_token', tokenCustomer)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(typeof res.body.errors).toEqual('string');
        expect(res.body.errors).toEqual('unauthorize action!');

        done();
      });
  });


  it('validation errors should send response 400 status code', (done) => {
    // SETUP
    const body = {
      name: '',
      image_url: '',
      price: '',
      stock: '',
      categoryId: 1
    }

    // EXECUTE
    request(app)
      .post('/products')
      .set('access_token', tokenAdmin)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['field name is required']),
          expect.arrayContaining(['field price is required']),
          expect.arrayContaining(['field stock is required']),
          expect.arrayContaining(['field category is required']),
        );

        done();
      });
  });

  it('price or stock negative should send response 400 status code', (done) => {
    // SETUP
    const body = {
      name: 'Air Jordan 4',
      image_url: 'image.jpg',
      price: -2000000,
      stock: -10,
      categoryId: 1
    }

    // EXECUTE
    request(app)
      .post('/products')
      .set('access_token', tokenAdmin)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['price cannot be negative']),
          expect.arrayContaining(['stock cannot be negative'])
        );

        done();
      });
  });

  it('category id not found should send response 404 status code', (done) => {
    // SETUP
    const body = {
      name: 'Air Jordan 4',
      image_url: 'image.jpg',
      price: 2000000,
      stock: 10,
      categoryId: 990
    }

    // EXECUTE
    request(app)
      .post('/products')
      .set('access_token', tokenAdmin)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(typeof res.body.errors).toEqual('string');
        expect(res.body.errors).toEqual('not found!');

        done();
      });
  });


  it('jwt not provided should send response with 500 status code', (done) => {
    //Setup
    const body = {
      name: 'Air Jordan 4',
      image_url: 'image.jpg',
      price: 2000000,
      stock: 10,
      categoryId: 1
    }

    // EXECUTE
    request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(500);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(typeof res.body.errors).toEqual('string');
        expect(res.body.errors).toEqual('jwt must be provided');

        done();
      });
  });
});

describe('PUT /products', () => {
  it('should send response with 200 status code', (done) => {
    const body = {
      name: 'Air Jordan 5',
      image_url: 'image2.jpg',
      price: 3000000,
      stock: 20,
      categoryId: 2
    }

    request(app)
      .put(`/products/${productId}`)
      .set('access_token', tokenAdmin)
      .send(body)
      .end((err, res) => {
        if (err) next(err);

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('id');
        expect(typeof res.body.id).toEqual('number');
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toEqual(body.name);
        expect(res.body).toHaveProperty('image_url');
        expect(res.body.image_url).toEqual(body.image_url);
        expect(res.body).toHaveProperty('price');
        expect(res.body.price).toEqual(body.price);
        expect(res.body).toHaveProperty('stock');
        expect(res.body.stock).toEqual(body.stock);
        expect(res.body).toHaveProperty('categoryId');
        expect(res.body.categoryId).toEqual(body.categoryId);
        expect(res.body).toHaveProperty('userId');

        done()
      });
  });

  it('unauthorize action role not admin should send response with 401 status code', (done) => {
    //Setup
    const body = {
      name: 'Air Jordan 4',
      image_url: 'image.jpg',
      price: 2000000,
      stock: 10,
      categoryId: 1
    }

    // EXECUTE
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', tokenCustomer)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(typeof res.body.errors).toEqual('string');
        expect(res.body.errors).toEqual('unauthorize action!');

        done();
      });
  });


  it('validation errors should send response 400 status code', (done) => {
    // SETUP
    const body = {
      name: '',
      image_url: '',
      price: '',
      stock: '',
      categoryId: 1
    }

    // EXECUTE
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', tokenAdmin)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['field name is required']),
          expect.arrayContaining(['field price is required']),
          expect.arrayContaining(['field stock is required']),
          expect.arrayContaining(['field category is required']),
        );

        done();
      });
  });

  it('price or stock negative should send response 400 status code', (done) => {
    // SETUP
    const body = {
      name: 'Air Jordan 5',
      image_url: 'image2.jpg',
      price: -3000000,
      stock: -20,
      categoryId: 1
    }

    // EXECUTE
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', tokenAdmin)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(['price cannot be negative']),
          expect.arrayContaining(['stock cannot be negative'])
        );

        done();
      });
  });

  it('category id not found should send response 404 status code', (done) => {
    // SETUP
    const body = {
      name: 'Air Jordan 5',
      image_url: 'image2.jpg',
      price: 3000000,
      stock: 20,
      categoryId: 990
    }

    // EXECUTE
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', tokenAdmin)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(typeof res.body.errors).toEqual('string');
        expect(res.body.errors).toEqual('not found!');

        done();
      });
  });

  it('jwt not provided should send response with 500 status code', (done) => {
    //Setup
    const body = {
      name: 'Air Jordan 5',
      image_url: 'image2.jpg',
      price: 3000000,
      stock: 20,
      categoryId: 2
    }

    // EXECUTE
    request(app)
      .put(`/products/${productId}`)
      .send(body)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(500);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(typeof res.body.errors).toEqual('string');
        expect(res.body.errors).toEqual('jwt must be provided');

        done();
      });
  });

});

describe('DELETE /products', () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set('access_token', tokenAdmin)
      .end((err, res) => {
        if (err) next(err);

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('message');
        expect(typeof res.body.message).toEqual('string');
        expect(res.body.message).toEqual('successfully delete product');

        done()
      });
  });

  it('unauthorize action role not admin should send response with 401 status code', (done) => {
    // EXECUTE
    request(app)
      .delete(`/products/${productId}`)
      .set('access_token', tokenCustomer)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(typeof res.body.errors).toEqual('string');
        expect(res.body.errors).toEqual('unauthorize action!');

        done();
      });
  });


  it('product not found should send response with 404 status code', (done) => {
    // EXECUTE
    request(app)
      .delete(`/products/999`)
      .set('access_token', tokenAdmin)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(typeof res.body.errors).toEqual('string');
        expect(res.body.errors).toEqual('not found!');

        done();
      });
  });

  it('jwt not provided should send response with 500 status code', (done) => {
    // EXECUTE
    request(app)
      .delete(`/products/${productId}`)
      .end((err, res) => {
        if (err) done(err);

        // ASSERT
        expect(res.statusCode).toEqual(500);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('errors');
        expect(typeof res.body.errors).toEqual('string');
        expect(res.body.errors).toEqual('jwt must be provided');

        done();
      });
  });
});