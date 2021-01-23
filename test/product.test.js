const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { hashPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

let token_admin;
let token_customer;
let dummyProductId;

beforeAll((done) => {
	queryInterface
		.bulkInsert(
			'Users',
			[
				{
					email: 'admin@email.com',
					password: hashPassword('123456'),
					role: 'admin',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{ returning: true }
		)
		.then((user) => {
			// console.log(user)
			UserId_admin = user[0].id;
			const payload = {
				id: user[0].id,
				email: user[0].email,
				role: user[0].role,
			};
			token_admin = generateToken(payload);
			// console.log(token_admin);
			done();
		})
		.catch((err) => {
			done(err);
		});

	queryInterface
		.bulkInsert(
			'Users',
			[
				{
					email: 'customer1@email.com',
					password: hashPassword('123456'),
					role: 'customer',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{ returning: true }
		)
		.then((user) => {
			// console.log(user);
			const payload = {
				id: user[0].id,
				email: user[0].email,
				role: user[0].role,
			};
			token_customer = generateToken(payload);
			// console.log(token_customer);
			done();
		})
		.catch((err) => {
			done(err);
		});

	queryInterface
		.bulkInsert(
			'Products',
			[
				{
					name: 'Barang Dummy',
					image_url: 'Gambar Dummy URL',
					price: 100000,
					stock: 10,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{ returning: true }
		)
		.then((data) => {
			(dummyProductId = data[0].id),
				// console.log(data);
				done();
		})
		.catch((err) => {
			done(err);
		});
});

afterAll((done) => {
	queryInterface
		.bulkDelete('Users')
		.then((response) => {
			done();
		})
		.catch((err) => {
			done(err);
		});

	queryInterface
		.bulkDelete('Products')
		.then((response) => {
			done();
		})
		.catch((err) => {
			done(err);
		});
});

// --- PRODUCT TEST ---

describe('Fetch Product GET /products', () => {
	describe('Success Fetch Product', () => {
		it('Success response with Status 200 - returning list of the product', (done) => {
			request(app)
				.get('/products')
				.set('access_token', token_admin)
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(200);
					expect(body[0]).toHaveProperty('name');
					expect(body[0]).toHaveProperty('image_url');
					done();
				});
		});
	});

	describe('Error Fetch Product', () => {
		it('Error response with Status 401 - No Access Token', (done) => {
			request(app)
				.get('/products')
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Please Login First');
					done();
				});
		});
		it('Error response with Status 401 - Invalid Access Token', (done) => {
			request(app)
				.get('/products')
				.set('access_token', 'some wrong token')
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Invalid email or password');
					done();
				});
		});
	});
});

describe('Get Product by Id GET /products/:id', () => {
	describe('Success Get Product by Id', () => {
		it('Success response with Status 200 - returning the detail of the dummy product', (done) => {
			request(app)
				.get(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(200);
					expect(body.name).toBe('Barang Dummy');
					expect(body.image_url).toBe('Gambar Dummy URL');
					done();
				});
		});
	});
	describe('Error Get Product by Id', () => {
		it('Error response with Status 401 - No Access Token', (done) => {
			request(app)
				.get(`/products/${dummyProductId}`)
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Please Login First');
					done();
				});
		});
		it('Error response with Status 401 - Invalid Access Token', (done) => {
			request(app)
				.get(`/products/${dummyProductId}`)
				.set('access_token', 'some wrong token')
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Invalid email or password');
					done();
				});
		});
		it('Error response with Status 404 - Product Not Found', (done) => {
			request(app)
				.get(`/products/0`)
				.set('access_token', token_admin)
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(404);
					expect(body).toHaveProperty('message', 'Product Not Found');
					done();
				});
		});
	});
});

describe('Create Product POST /products', () => {
	describe('Success Create Product', () => {
		it('Success response with Status 201 - returning value of the product', (done) => {
			request(app)
				.post(`/products`)
				.set('access_token', token_admin)
				.send({
					name: 'Tas',
					image_url: 'Gambar Tas URL',
					price: 20000,
					stock: 30,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(201);
					expect(body).toHaveProperty('name', 'Tas');
					done();
				});
		});
	});
	describe('Error Create Product', () => {
		it('Error response while Creating Product with Status 401 - Logged In User Role not Admin', (done) => {
			request(app)
				.post('/products')
				.set('access_token', token_customer)
				.send({
					name: 'Tas',
					image_url: 'Gambar Tas URL',
					price: 20000,
					stock: 30,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty(
						'message',
						'Only Admin Who Have Authorization for this Action'
					);
					done();
				});
		});
		it('Error response with Status 401 - No Access Token', (done) => {
			request(app)
				.post('/products')
				.send({
					name: 'Tas',
					image_url: 'Gambar Tas URL',
					price: 20000,
					stock: 30,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Please Login First');
					done();
				});
		});
		it('Error response with Status 401 - Invalid Access Token', (done) => {
			request(app)
				.post('/products')
				.set('access_token', 'some wrong token')
				.send({
					name: 'Tas',
					image_url: 'Gambar Tas URL',
					price: 20000,
					stock: 30,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Invalid email or password');
					done();
				});
		});
		it('Error response while Creating with Status 400 - Products Attributes Cannot be Empty', (done) => {
			request(app)
				.post(`/products`)
				.set('access_token', token_admin)
				.send({
					name: '',
					image_url: '',
					price: '',
					stock: '',
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Name Cannot be Empty",
						"Product's Image Cannot be Empty",
						"Product's Price Cannot be Empty",
						"Product's Stock Cannot be Empty",
					]);
					done();
				});
		});
		it('Error response while Creating with Status 400 - Products Name Cannot be Empty', (done) => {
			request(app)
				.post(`/products`)
				.set('access_token', token_admin)
				.send({
					name: '',
					image_url: 'Gambar Tas',
					price: 15000,
					stock: 10,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Name Cannot be Empty",
					]);
					done();
				});
		});
		it('Error response while Creating with Status 400 - Products Image URL Cannot be Empty', (done) => {
			request(app)
				.post(`/products`)
				.set('access_token', token_admin)
				.send({
					name: 'Tas',
					image_url: '',
					price: 10000,
					stock: 15,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Image Cannot be Empty",
					]);
					done();
				});
		});
		it('Error response while Creating with Status 400 - Products Price Cannot be Empty', (done) => {
			request(app)
				.post(`/products`)
				.set('access_token', token_admin)
				.send({
					name: 'Tas',
					image_url: 'Gambar Tas',
					price: '',
					stock: 16,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Price Cannot be Empty",
					]);
					done();
				});
		});
		it('Error response while Creating with Status 400 - Products Stock Cannot be Empty', (done) => {
			request(app)
				.post(`/products`)
				.set('access_token', token_admin)
				.send({
					name: 'Tas',
					image_url: 'Gambar Tas',
					price: 10000,
					stock: '',
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Stock Cannot be Empty",
					]);
					done();
				});
		});
		it('Error response while Creating with Status 400 - Products Stock Cannot Less Than Zero', (done) => {
			request(app)
				.post(`/products`)
				.set('access_token', token_admin)
				.send({
					name: 'Tas',
					image_url: 'Gambar Tas',
					price: 10000,
					stock: -15,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', 'Stock cannot Less Than Zero');
					done();
				});
		});
		it('Error response while Creating with Status 400 - Products Price Cannot Less Than Zero', (done) => {
			request(app)
				.post(`/products`)
				.set('access_token', token_admin)
				.send({
					name: 'Tas',
					image_url: 'Gambar Tas',
					price: -10000,
					stock: 15,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', 'Price cannot Less Than Zero');
					done();
				});
		});
	});
});

describe('Edit Product PUT /products/:id', () => {
	describe('Success Edit Product', () => {
		it('Success Response after Editing with Status 200 - returning value of the edited product', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					name: 'Barang Baru',
					image_url: 'Gambar Barang Baru',
					price: 90000,
					stock: 10,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(200);
					expect(body).toHaveProperty('name', 'Barang Baru');
					done();
				});
		});
	});
	describe('Error Edit Product', () => {
		it('Error response while Editing with Status 401 - Logged In User Role not Admin', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.set('access_token', token_customer)
				.send({
					name: 'Barang Baru',
					image_url: 'Gambar Barang Baru',
					price: 90000,
					stock: 10,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty(
						'message',
						'Only Admin Who Have Authorization for this Action'
					);
					done();
				});
		});
		it('Error response while Editing with Status 404 - Product Id Not Found', (done) => {
			request(app)
				.put(`/products/0`)
				.set('access_token', token_admin)
				.send({
					name: 'Barang Baru',
					image_url: 'Gambar Barang Baru',
					price: 90000,
					stock: 10,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(404);
					expect(body).toHaveProperty('message', 'Product Not Found');
					done();
				});
		});
		it('Error response while Editing with Status 401 - No Access Token', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.send({
					name: 'Barang Baru',
					image_url: 'Gambar Barang Baru',
					price: 90000,
					stock: 10,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Please Login First');
					done();
				});
		});
		it('Error response while Editing with Status 401 - Wrong Access Token', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.set('access_token', 'wrong access token')
				.send({
					name: 'Barang Baru',
					image_url: 'Gambar Barang Baru',
					price: 90000,
					stock: 10,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Invalid email or password');
					done();
				});
		});
		it('Error response while Editing with Status 400 - Update Attributes Cannot be Empty', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					name: '',
					image_url: '',
					price: '',
					stock: '',
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Name Cannot be Empty",
						"Product's Image Cannot be Empty",
						"Product's Price Cannot be Empty",
						"Product's Stock Cannot be Empty",
					]);
					done();
				});
		});
		it('Error response while Editing with Status 400 - Update Products Name Cannot be Empty', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					name: '',
					image_url: 'Gambar Tas Baru',
					price: 15000,
					stock: 10,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Name Cannot be Empty",
					]);
					done();
				});
		});
		it('Error response while Editing with Status 400 - Update Products Image URL Cannot be Empty', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					name: 'Gambar Tas Baru',
					image_url: '',
					price: 10000,
					stock: 15,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Image Cannot be Empty",
					]);
					done();
				});
		});
		it('EError response while Editing with Status 400 - Update Price Cannot be Empty', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					name: 'Tas Baru',
					image_url: 'Gambar Tas Baru',
					price: '',
					stock: 16,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Price Cannot be Empty",
					]);
					done();
				});
		});
		it('Error response while Editing with Status 400 - Update Stock Cannot be Empty', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					name: 'Tas',
					image_url: 'Gambar Tas',
					price: 10000,
					stock: '',
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Stock Cannot be Empty",
					]);
					done();
				});
		});
		it('Error response while Editing with Status 400 - Products Stock Cannot Less Than Zero', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					name: 'Tas Baru',
					image_url: 'Gambar Tas Baru',
					price: 10000,
					stock: -15,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', 'Stock cannot Less Than Zero');
					done();
				});
		});
		it('Error response while Editing with Status 400 - Products Price Cannot Less Than Zero', (done) => {
			request(app)
				.put(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					name: 'Tas',
					image_url: 'Gambar Tas',
					price: -10000,
					stock: 15,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', 'Price cannot Less Than Zero');
					done();
				});
		});
	});
});

describe('Update Product PATCH /products/:id', () => {
	describe('Success Update Product', () => {
		it('Success Response after Updating with Status 200 - returning value of the updated product', (done) => {
			request(app)
				.patch(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					stock: 11,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(200);
					expect(body).toHaveProperty('stock', 11);
					done();
				});
		});
	});
	describe('Error Update Product', () => {
		it('Error response while Updating with Status 401 - Logged In User Role not Admin', (done) => {
			request(app)
				.patch(`/products/${dummyProductId}`)
				.set('access_token', token_customer)
				.send({
					stock: 11,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty(
						'message',
						'Only Admin Who Have Authorization for this Action'
					);
					done();
				});
		});
		it('Error response while Updating with Status 404 - Product Id Not Found', (done) => {
			request(app)
				.patch(`/products/0`)
				.set('access_token', token_admin)
				.send({
					stock: 11,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(404);
					expect(body).toHaveProperty('message', 'Product Not Found');
					done();
				});
		});
		it('Error response while Updating with Status 401 - No Access Token', (done) => {
			request(app)
				.patch(`/products/${dummyProductId}`)
				.send({
					stock: 11,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Please Login First');
					done();
				});
		});
		it('Error response while Updating with Status 401 - Wrong Access Token', (done) => {
			request(app)
				.patch(`/products/${dummyProductId}`)
				.set('access_token', 'wrong access token')
				.send({
					stock: 11,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Invalid email or password');
					done();
				});
		});
		it('Error response while Updating with Status 400 - Stock Cannot be Empty', (done) => {
			request(app)
				.patch(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					stock: '',
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', [
						"Product's Stock Cannot be Empty",
					]);
					done();
				});
		});
		it('Error response while Updating with Status 400 - Stock Cannot be less than Zero', (done) => {
			request(app)
				.patch(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.send({
					stock: -1,
				})
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(400);
					expect(body).toHaveProperty('message', 'Stock cannot Less Than Zero');
					done();
				});
		});
	});
});

describe('Delete Product DELETE /products/:id', () => {
	describe('Success Delete Product', () => {
		it('Success Response after Deleting with Status 200 - returning notification message', (done) => {
			request(app)
				.delete(`/products/${dummyProductId}`)
				.set('access_token', token_admin)
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(200);
					expect(body).toHaveProperty('message', 'Product Deleted');
					done();
				});
		});
	});
	describe('Error Delete Product', () => {
		it('Error Response while Deleting with Status 401 - Logged In User Role not Admin', (done) => {
			request(app)
				.delete(`/products/${dummyProductId}`)
				.set('access_token', token_customer)
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty(
						'message',
						'Only Admin Who Have Authorization for this Action'
					);
					done();
				});
		});
		it('Error Response while Deleting with Status 404 - Product Id Not Found', (done) => {
			request(app)
				.delete(`/products/0`)
				.set('access_token', token_admin)
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(404);
					expect(body).toHaveProperty('message', 'Product Not Found');
					done();
				});
		});
		it('Error Response while Deleting with Status 401 - No Access Token', (done) => {
			request(app)
				.delete(`/products/${dummyProductId}`)
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Please Login First');
					done();
				});
		});
		it('Error Response while Deleting with Status 401 - Invalid Access Token', (done) => {
			request(app)
				.delete(`/products/${dummyProductId}`)
				.set('access_token', 'wrong access token')
				.end((err, res) => {
					const { body, status } = res;
					if (err) {
						return done(err);
					}
					expect(status).toBe(401);
					expect(body).toHaveProperty('message', 'Invalid email or password');
					done();
				});
		});
	});
});