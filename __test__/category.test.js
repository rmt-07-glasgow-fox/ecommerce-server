const request = require('supertest');
const app = require('../app');
const models = require('../models');

describe('Category', () => {
  let token = '';
  let idCategory = 0;

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

  it('Create category without access token', (done) => {
    const body = {
      name: 'Cake',
    };

    request(app)
      .post('/categories')
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

  it('Create category with empty name', (done) => {
    const body = {
      name: '',
    };

    request(app)
      .post('/categories')
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

  it('Create category with valid name', (done) => {
    const body = {
      name: 'Cake',
    };

    request(app)
      .post('/categories')
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('id');
        expect(typeof res.body.id).toEqual('number');
        expect(res.body).toHaveProperty('name', body.name);

        idCategory = res.body.id;

        done();
      });
  });

  it('Get all categories', (done) => {
    request(app)
      .get('/categories')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);

        done();
      });
  });

  it('Update category without access token', (done) => {
    const body = {
      name: 'Cake',
    };

    request(app)
      .put(`/categories/${idCategory}`)
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

  it('Update category with invalid id category', (done) => {
    const body = {
      name: 'Cake',
    };

    request(app)
      .put(`/categories/0`)
      .send(body)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Category not found' }])
        );

        done();
      });
  });

  it('Update category with empty name', (done) => {
    const body = {
      name: '',
    };

    request(app)
      .put(`/categories/${idCategory}`)
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

  it('Update category with valid name', (done) => {
    const body = {
      name: 'Cake',
    };

    request(app)
      .put(`/categories/${idCategory}`)
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

  it('Delete category without access token', (done) => {
    request(app)
      .delete(`/categories/${idCategory}`)
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

  it('Delete category with invalid id category', (done) => {
    request(app)
      .delete(`/categories/0`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual('object');
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body).toEqual(
          expect.arrayContaining([{ message: 'Category not found' }])
        );

        done();
      });
  });

  it('Delete category with valid id category', (done) => {
    request(app)
      .delete(`/categories/${idCategory}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('message', 'Category has been deleted');

        done();
      });
  });
});
