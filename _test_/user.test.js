const request = require('supertest');
const app = require('../app');
const { clearUsers, createUser } = require('../helpers/clearUsers');
const { hashPassword } = require('../helpers/hashPassword');

beforeAll((done) => {
	const user3 = {
		email: 'admin4@mail.com',
		password: '1234',
		role: 'admin'
	}

	createUser(user3)
	.then(data => {
		done();
	})
	.catch(err => {
		console.log(err);
	});
});

afterAll((done) => {

    clearUsers()
	.then(() => {
		done();
	})
	.catch(err => {
		console.log(err);
	});
});

describe('POST /users/register', () => {
    describe('Create user/ register user', () => {
        it('should be response with status 201 admin user', (done) => {
            // Setup
            const body = {
                email: 'admin@mail.com',
                password: hashPassword('1234'),
                role: 'admin'
            }
            // Execute
            request(app)
                .post('/users/register')
                .send(body)
                .end((err, res) => {
                    if(err) done(err);

                    // Assert
                    expect(res.statusCode).toEqual(201);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('id');
					expect(typeof res.body.id).toEqual('number');
					expect(res.body).toHaveProperty('email');
					expect(typeof res.body.email).toEqual('string');
					expect(res.body.email).toEqual(body.email);
					expect(res.body.email).not.toBeFalsy();
					expect(res.body).toHaveProperty('password');
					expect(typeof res.body.password).toEqual('string');
                    expect(res.body.password).toEqual(body.password);
                    expect(res.body.password).not.toBeFalsy();
					expect(res.body).toHaveProperty('role');
					expect(typeof res.body.role).toEqual('string');
                    expect(res.body.role).toEqual(body.role);
                    expect(res.body.role).not.toBeFalsy();
	
					done();
                });
        });

        it('should be response with status 201 non admin user', (done) => {
            // Setup
            const body = {
                email: 'admin1@mail.com',
                password: hashPassword('1234'),
                role: 'customer'
            }
            // Execute
            request(app)
                .post('/users/register')
                .send(body)
                .end((err, res) => {
                    if(err) done(err);

                    // Assert
                    expect(res.statusCode).toEqual(201);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('id');
					expect(typeof res.body.id).toEqual('number');
					expect(res.body).toHaveProperty('email');
					expect(typeof res.body.email).toEqual('string');
					expect(res.body.email).toEqual(body.email);
					expect(res.body.email).not.toBeFalsy();
					expect(res.body).toHaveProperty('password');
					expect(typeof res.body.password).toEqual('string');
                    expect(res.body.password).toEqual(body.password);
                    expect(res.body.password).not.toBeFalsy();
					expect(res.body).toHaveProperty('role');
					expect(typeof res.body.role).toEqual('string');
                    expect(res.body.role).toEqual(body.role);
                    expect(res.body.role).not.toBeFalsy();
	
					done();
                });
        });

        describe('All field is empty', () => {
            it('should be response with status code 400', (done) => {
                // Setup
                const body = {
                    email: null,
                    password: hashPassword(''),
                    role: ''
                };
                // Execute
                request(app)
                    .post('/users/register')
                    .send(body)
                    .end((err, res) => {
                        if(err) done(err);
    
                        // Assert
                        expect(res.statusCode).toEqual(400);
                        expect(typeof res.body).toEqual('object');
                        expect(res.body).toHaveProperty('errors');
                        expect(Array.isArray(res.body.errors)).toEqual(true);
                        expect(res.body.errors).toEqual(
                            expect.arrayContaining(['Email is required']),
                            expect.arrayContaining(['Password is required']),
                            expect.arrayContaining(['Role is required'])
                        );
    
                        done();
                    });
            });
        });

        describe('Invalid email format', () => {
            it('should be response with status code 400', (done) => {
                // Setup
                const body = {
                    email: 'admin',
                    password: hashPassword('1234'),
                    role: 'admin'
                };
                // Execute
                request(app)
                    .post('/users/register')
                    .send(body)
                    .end((err, res) => {
                        if(err) done(err);
    
                        // Assert
                        expect(res.statusCode).toEqual(400);
                        expect(typeof res.body).toEqual('object');
                        expect(res.body).toHaveProperty('errors');
                        expect(Array.isArray(res.body.errors)).toEqual(true);
                        expect(res.body.errors).toEqual(
                            expect.arrayContaining(['Email invalid format'])
                        );

                        done();
                    });
            });
        });
    });
});

describe('POST /users/login', () => {
    describe('Login user', () => {
        it('should be response with status 200', async (done) => {
            // Setup
            const body = {
                email: 'admin@mail.com',
                password: '1234',
            };

            // Execute
            request(app)
                .post('/users/login')
                .send(body)
                .end((err, res) => {
                    if(err) done(err);

                    console.log(res.statusCode);
                    console.log(res.body);
                    expect(res.statusCode).toEqual(200);
					expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('access_token');
                    expect(typeof res.body.access_token).toEqual('string');
	
					done();
                });
        });

        describe('User not found because of email not found', () => {
            it('should be response with status code 404', (done) => {
                // Setup
                const body = {
                    email: 'notadmin@mail.com',
                    password: '1234'
                };
                // Execute
                request(app)
                    .post('/users/login')
                    .send(body)
                    .end((err, res) => {
                        if(err) done(err);
    
                        // Assert
                        expect(res.statusCode).toEqual(404);
                        expect(typeof res).toEqual('object');
                        expect(JSON.parse(res.text)).toEqual({ msg : 'Email / Password not found'});
    
                        done();
                    });
            });
        });

        describe('User not found because of password not match', () => {
            it('should be response with status code 404', (done) => {
                // Setup
                const body = {
                    email: 'admin@mail.com',
                    password: '12345'
                };
                // Execute
                request(app)
                    .post('/users/login')
                    .send(body)
                    .end((err, res) => {
                        if(err) done(err);
    
                        // Assert
                        expect(res.statusCode).toEqual(404);
                        expect(typeof res).toEqual('object');
                        expect(JSON.parse(res.text)).toEqual({ msg : 'Email / Password not found'});
    
                        done();
                    });
            });
        });
    });
});

