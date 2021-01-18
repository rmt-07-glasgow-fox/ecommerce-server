const request = require('supertest');

describe('POST /products', () => {
  // *Test jika berhasil
  it('should response with 201 status code', (done) => {
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
    .end((err, res) => {
      if(err) done(err);

      // Assert
      expect(res.statusCode).toEqual(201);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('id');
      expect(typeof res.body.id).toEqual('number');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toHaveProperty(body.name);
      expect(res.body).toHaveProperty('imageUrl');
      expect(res.body.imageUrl).toHaveProperty(body.imageUrl);
      expect(res.body).toHaveProperty('price');
      expect(res.body.price).toHaveProperty(body.price);
      expect(res.body).toHaveProperty('stock');
      expect(res.body.stock).toHaveProperty(body.stock);

      done();
    })
  })

  // !Test jika name kosong
  it('should response with 400 status code', (done) => {
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
  it('should response with 400 status code', (done) => {
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
  it('should response with 400 status code', (done) => {
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
  it('should response with 400 status code', (done) => {
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
  it('should response with 400 status code', (done) => {
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
  it('should response with 400 status code', (done) => {
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
  it('should response with 400 status code', (done) => {
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
  it('should response with 400 status code', (done) => {
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