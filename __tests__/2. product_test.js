const request = require('supertest');
const app = require('../app.js');
const models = require('../models');
let access_token = '';
let access_token_user = '';

/* =======================================================
   ################# TEST ADD PRODUCT ###################
   ======================================================= */

describe('POST /products', () => {
  beforeAll( async () => {
    const body = {
      email: 'admi2n@mail.com',
      password: '123456',
      role: 'admin'
    }
    // Execute login admin
    await request(app)
    .post('/register')
    .send(body)


    const response = await request(app)
    .post('/login')
    .send(body)
    
    access_token = response.body.access_token;

    // Execute login bukan admin
    body.email = 'user@mail.com';
    body.role = 'user';

    await request(app)
    .post('/register')
    .send(body)

    const response_user = await request(app)
    .post('/login')
    .send(body)
    access_token_user = response_user.body.access_token;
  })



  // *Test jika berhasil
  it('If success should response with 201 status code', (done) => {
    // setup
    const body = {
      name: 'Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      price: 12500.9,
      stock: 5
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      
      expect(res.statusCode).toEqual(201);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('id');
      expect(typeof res.body.id).toEqual('number');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual(body.name);
      expect(res.body).toHaveProperty('imageUrl');
      expect(res.body.imageUrl).toEqual(body.imageUrl);
      expect(res.body).toHaveProperty('price');
      expect(res.body.price).toEqual(body.price);
      expect(res.body).toHaveProperty('stock');
      expect(res.body.stock).toEqual(body.stock);

      done();
    })
  })

  // *Test jika bukan admin
  it('If not admin should response with 401 status code', (done) => {
    // setup
    const body = {
      name: 'Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      price: 12500.9,
      stock: 5
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token_user)
    .end((err, res) => {
      if(err) done(err);

      // Assert      
      expect(res.statusCode).toEqual(401);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('message');
      expect(res.body.name).toEqual('Unauthorized');
      expect(res.body.message).toEqual('Not authorized');
      done();
    })
  })

  // !Test jika access token kosong
  it('If name empty should response with 400 status code', (done) => {
    // setup
    const body = {
      name: '',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      price: 12500.9,
      stock: 5
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', '')
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(500);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual('Internal server error');
      expect(res.body).toHaveProperty('message');
      expect(res.body.message.message).toEqual('jwt must be provided');
      done();
    })
  })

  // !Test jika name kosong
  it('If access_token empty should response with 500 status code', (done) => {
    // setup
    const body = {
      name: '',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      price: 12500.9,
      stock: 5
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Name is required'])
      )
      done();
    })
  })

  // !Test jika imageUrl kosong
  it('If imageUrl empty should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Product 1',
      imageUrl: '',
      price: 12500.9,
      stock: 5
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Image Url is required'])
      )
      done();
    })
  })

  // !Test jika price kosong
  it('If price empty should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      price: '',
      stock: 5
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Price is required'])
      )
      done();
    })
  })

  // !Test jika stock kosong
  it('if stock empty should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      price: 12500.9,
      stock: ''
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Stock is required'])
      )
      done();
    })
  })

  // !Test jika Price negative
  it('If price negative should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      price: -12500.9,
      stock: 5
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Minimum price is 0'])
      )
      done();
    })
  })

  // !Test jika Stock negative
  it('If stock negative should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      price: 12500.9,
      stock: -5
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Minimum stock is 0'])
      )
      done();
    })
  })

  // !Test jika Price adalah string
  it('If price not number should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      price: 'dua belas ribu lima ratus koma sembilan rupiah',
      stock: 5
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Price must be a number'])
      )
      done();
    })
  })

  // !Test jika Stock adalah string
  it('If stock not number should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      price: 12500.9,
      stock: 'lima'
    }

    // Execute
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Stock must be a number'])
      )
      done();
    })
  })
})

/* =======================================================
   ################ TEST GET ALL PRODUCT #################
   ======================================================= */

describe('GET /products', () => {
  // Jika berhasil
  it('If success should response with 200 status code', (done) => {

    // Execute
    request(app)
    .get('/products')
    .end((err, res) => {
      if(err) done(err);

      // Assert
      
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual('object');
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('imageUrl');
      expect(res.body[0]).toHaveProperty('price');
      expect(res.body[0]).toHaveProperty('stock');
      expect(res.body[0].id).toEqual(1);
      expect(res.body[0].name).toEqual('Product 1');
      expect(res.body[0].imageUrl).toEqual('https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80');
      expect(res.body[0].price).toEqual(12500.9);
      expect(res.body[0].stock).toEqual(5);

      done();
    })
  })
})

/* =======================================================
   ################# TEST UPDATE PRODUCT #################
   ======================================================= */

describe('PUT /products', () => {  

  it('If success should response with 200 status code', (done) => {
    // setup
    const body = {
      name: 'Update Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
      price: 125000,
      stock: 10
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('id');
      expect(typeof res.body.id).toEqual('number');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual(body.name);
      expect(res.body).toHaveProperty('imageUrl');
      expect(res.body.imageUrl).toEqual(body.imageUrl);
      expect(res.body).toHaveProperty('price');
      expect(res.body.price).toEqual(body.price);
      expect(res.body).toHaveProperty('stock');
      expect(res.body.stock).toEqual(body.stock);

      done();
    })
  })

  // *Test jika bukan admin
  it('If not admin should response with 401 status code', (done) => {
    // setup
    const body = {
      name: 'Update Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
      price: 125000,
      stock: 10
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', access_token_user)
    .end((err, res) => {
      if(err) done(err);

      // Assert      
      expect(res.statusCode).toEqual(401);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('message');
      expect(res.body.name).toEqual('Unauthorized');
      expect(res.body.message).toEqual('Not authorized');
      done();
    })
  })

  // !Test jika access_token kosong
  it('If access_token empty should response with 500 status code', (done) => {
    // setup
    const body = {
      name: '',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
      price: 125000,
      stock: 10
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', '')
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(500);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual('Internal server error');
      expect(res.body).toHaveProperty('message');
      expect(res.body.message.message).toEqual('jwt must be provided');
      done();
    })
  })

  // !Test jika name kosong
  it('If name empty should response with 400 status code', (done) => {
    // setup
    const body = {
      name: '',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
      price: 125000,
      stock: 10
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Name is required'])
      )
      done();
    })
  })

  // !Test jika imageUrl kosong
  it('If imageUrl empty should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Update Product 1',
      imageUrl: '',
      price: 125000,
      stock: 10
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Image Url is required'])
      )
      done();
    })
  })

  // !Test jika price kosong
  it('If price empty should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Update Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
      price: '',
      stock: 10
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Price is required'])
      )
      done();
    })
  })

  // !Test jika stock kosong
  it('if stock empty should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Update Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
      price: 125000,
      stock: ''
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Stock is required'])
      )
      done();
    })
  })

  // !Test jika Price negative
  it('If price negative should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Update Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
      price: -125000,
      stock: 10
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Minimum price is 0'])
      )
      done();
    })
  })

  // !Test jika Stock negative
  it('If stock negative should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Update Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
      price: 125000,
      stock: -10
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Minimum stock is 0'])
      )
      done();
    })
  })

  // !Test jika Price adalah string
  it('If price not number should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Update Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
      price: 'Seratus dua puluh lima ribu rupiah',
      stock: 10
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Price must be a number'])
      )
      done();
    })
  })

  // !Test jika Stock adalah string
  it('If Stock not number should response with 400 status code', (done) => {
    // setup
    const body = {
      name: 'Update Product 1',
      imageUrl: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297',
      price: 125000,
      stock: 'Sepuluh'
    }

    // Execute
    request(app)
    .put('/products/1')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toEqual(true);
      expect(res.body.errors).toEqual(
        expect.arrayContaining(['Stock must be a number'])
      )
      done();
    })
  })

})

/* =======================================================
   ################ TEST GET PRODUCT BY ID ###############
   ======================================================= */

describe('GET /products/:id', () => {
  it('If success should response with 200 status code', (done) => {

    // Execute
    request(app)
    .get('/products/1')
    .end((err, res) => {
      if(err) done(err);

      // Assert
      
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('id');
      expect(typeof res.body.id).toEqual('number');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual('Update Product 1');
      expect(res.body).toHaveProperty('imageUrl');
      expect(res.body.imageUrl).toEqual('https://images.unsplash.com/photo-1534196511436-921a4e99f297');
      expect(res.body).toHaveProperty('price');
      expect(res.body.price).toEqual(125000);
      expect(res.body).toHaveProperty('stock');
      expect(res.body.stock).toEqual(10);

      done();
    })
  })

  // Jika product id yg di kirim tidak ada di db
  it('If product is not found should response with 401 status code', (done) => {

    // Execute
    request(app)
    .get('/products/99')
    .end((err, res) => {
      if(err) done(err);

      // Assert
      
      expect(res.statusCode).toEqual(401);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('message');
      expect(res.body.name).toEqual('Unauthorized');
      expect(res.body.message).toEqual('Not authorized');

      done();
    })
  })  
})

/* =======================================================
   ################# TEST DELETE PRODUCT #################
   ======================================================= */

describe('DELETE /products', () => {
  afterAll( async () => {  
    models.sequelize.close();
  })

  // Jika role bukan admin tidak boleh delete
  it('If role is not admin should response with 401 status code', (done) => {

    // Execute
    request(app)
    .delete('/products/1')
    .set('access_token', access_token_user)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      
      expect(res.statusCode).toEqual(401);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('message');
      expect(res.body.name).toEqual('Unauthorized');
      expect(res.body.message).toEqual('Not authorized');

      done();
    })
  })

  // Jika access_token kosong
  it('If access_token empty should response with 500 status code', (done) => {

    // Execute
    request(app)
    .delete('/products/1')
    .set('access_token', '')
    .end((err, res) => {
      if(err) done(err);

      // Assert
      
      expect(res.statusCode).toEqual(500);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual('Internal server error');
      expect(res.body).toHaveProperty('message');
      expect(res.body.message.message).toEqual('jwt must be provided');

      done();
    })
  })

  // Jika berhasil
  it('If success should response with 200 status code', (done) => {

    // Execute
    request(app)
    .delete('/products/1')
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) done(err);

      // Assert
      
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Success delete product');

      done();
    })
  })
})
