const path = require('path');
const request = require('supertest');
const app = require('../app');
const models = require('../models');

describe('Banner', () => {
  let token = '';
  let idBanner = 0;
  let image_url = '';
  let image_name = '';

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

  it('Create Banner without access token', (done) => {
    request(app)
      .post('/banners')
      .field('title', 'Cake')
      .field('status', true)
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

  it('Create banner with empty title', (done) => {
    request(app)
      .post('/banners')
      .field('title', '')
      .field('status', true)
      .attach('image', path.resolve(__dirname, 'images/hacktiv8logo.png'))
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'Title is required' }]));

        done();
      });
  });

  it('Create banner with valid title', (done) => {
    request(app)
      .post('/banners')
      .field('title', 'Cake')
      .field('status', true)
      .attach('image', path.resolve(__dirname, 'images/hacktiv8logo.png'))
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('id');
        expect(typeof res.body.id).toEqual('number');
        expect(res.body).toHaveProperty('title', 'Cake');
        expect(typeof res.body.status).toEqual('boolean');
        expect(res.body).toHaveProperty('status', true);
        expect(typeof res.body.image_url).toEqual('string');
        expect(res.body).toHaveProperty('image_url');
        expect(typeof res.body.image_name).toEqual('string');
        expect(res.body).toHaveProperty('image_name');

        idBanner = res.body.id;
        image_url = res.body.image_url;
        image_name = res.body.image_name;

        done();
      });
  });

  it('Get all banners', (done) => {
    request(app)
      .get('/banners')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);

        done();
      });
  });

  it('Update banner without access token', (done) => {
    const body = {
      title: 'Cake',
      status: true,
      image_url: image_url,
      image_name: image_name,
    };
    request(app)
      .put(`/banners/${idBanner}`)
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

  it('Update banner with invalid id banner', (done) => {
    const body = {
      title: 'Cake',
      status: true,
      image_url: image_url,
      image_name: image_name,
    };
    request(app)
      .put(`/banners/0`)
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'Banner not found' }]));

        done();
      });
  });

  it('Update banner with empty title', (done) => {
    const body = {
      title: '',
      status: true,
      image_url: image_url,
      image_name: image_name,
    };
    request(app)
      .put(`/banners/${idBanner}`)
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'Title is required' }]));

        done();
      });
  });

  it('Update banner with valid title', (done) => {
    const body = {
      title: 'Cake',
      status: true,
      image_url: image_url,
      image_name: image_name,
    };
    request(app)
      .put(`/banners/${idBanner}`)
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

  it('Delete banner without access token', (done) => {
    request(app)
      .delete(`/banners/${idBanner}`)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'You must be logged in.' }]));

        done();
      });
  });

  it('Delete banner with invalid id banner', (done) => {
    request(app)
      .delete(`/banners/0`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(expect.arrayContaining([{ message: 'Banner not found' }]));

        done();
      });
  });

  it('Delete banner with valid id banner', (done) => {
    request(app)
      .delete(`/banners/${idBanner}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('message', 'Banner has been deleted');

        done();
      });
  });
});
