const request = require('supertest');
const app = require('../app');
const models = require('../models');

describe('Banner', () => {
  let token = '';
  let idBanner = 0;

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
    const body = {
      title: 'Cake',
      status: true,
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
    };

    request(app)
      .post('/banners')
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

  it('Create banner with empty title', (done) => {
    const body = {
      title: '',
      status: true,
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
    };

    request(app)
      .post('/banners')
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Title is required' }])
        );

        done();
      });
  });

  it('Create banner with valid title', (done) => {
    const body = {
      title: 'Cake',
      status: true,
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
    };

    request(app)
      .post('/banners')
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('id');
        expect(typeof res.body.id).toEqual('number');
        expect(res.body).toHaveProperty('title', body.title);
        expect(typeof res.body.status).toEqual('boolean');
        expect(res.body).toHaveProperty('status', body.status);
        expect(typeof res.body.image_url).toEqual('string');
        expect(res.body).toHaveProperty('image_url', body.image_url);

        idBanner = res.body.id;

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
      name: 'Cake',
    };

    request(app)
      .put(`/banners/${idBanner}`)
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

  it('Update banner with invalid id banner', (done) => {
    const body = {
      title: 'Cake',
      status: true,
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
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
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Banner not found' }])
        );

        done();
      });
  });

  it('Update banner with empty title', (done) => {
    const body = {
      title: '',
      status: true,
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
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
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Title is required' }])
        );

        done();
      });
  });

  it('Update banner with valid name', (done) => {
    const body = {
      title: 'Cake',
      status: true,
      image_url:
        'https://www.kamspalace.co.uk/wp-content/gallery/our-cake-selection/IMG-20150114-WA0000-1024x576.jpg',
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
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'You must be logged in.' }])
        );

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
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Banner not found' }])
        );

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
