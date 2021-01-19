const request = require('supertest');
const app = require('../app');
const { clearUsers, clearProducts, createUser } = require('../helpers/clearUsers');
const { tokenGenerate, checkToken } = require('../helpers/jwt');
const { User, Product, sequelize } = require('../models');
// const { queryInterface } = sequelize;

let access_token1;
let access_token2
beforeAll((done) => {
	const user1 = {
		email: 'admin2@mail.com',
		password: '1234',
		role: 'admin'
	}
	const user2 = {
		email: 'admin3@mail.com',
		password: '1234',
		role: 'customer'
	}

	createUser(user1)
	.then(data => {
		return createUser(user2);
	})
	.then(data => {
		return User.findOne({ where: { email: user1.email } })
	})
	.then(user => {
		const payload = {
			email: user.email,
			role: user.role
		};
		access_token1 = tokenGenerate(payload);
		return User.findOne({ where: { email: user2.email }})
	})
	.then(user => {
		const payload = {
			email: user.email,
			role: user.role
		};
		access_token2 = tokenGenerate(payload);
		done();
	})
	.catch(err => {
		console.log(err);
	});
});

afterAll((done) => {
	clearProducts()
	.then(() => {
		return clearUsers()
	})
	.then(() => {
		done();
	})
	.catch(err => {
		console.log(err);
	});
});

describe('POST /products', () => {
	describe('Create products', () => {
        it('should be response with status code 201', (done) => {
            // Setup
			const body = {
                name: 'Key-chain Luffy',
				stock: 20,
				price: 20000,
				image_url: 'https://images-na.ssl-images-amazon.com/images/I/516oWi4IkuL._AC_.jpg'
            };
			// Execute
			request(app)
				.post('/products')
                .send(body)
                .set('access_token', access_token1)
				.end((err, res) => {
					if(err) done(err);
	
					// Assert
					expect(res.statusCode).toEqual(201);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('id');
					expect(typeof res.body.id).toEqual('number');
					expect(res.body).toHaveProperty('name');
					expect(typeof res.body.name).toEqual('string');
					expect(res.body.name).toEqual(body.name);
					expect(res.body.name).not.toBeFalsy();
					expect(res.body).toHaveProperty('stock');
					expect(typeof res.body.stock).toEqual('number');
					expect(res.body.stock).toEqual(body.stock);
					expect(res.body.stock).toBeGreaterThanOrEqual(0);
					expect(res.body).toHaveProperty('price');
					expect(typeof res.body.stock).toEqual('number');
					expect(res.body.stock).toEqual(body.stock);
					expect(res.body.stock).toBeGreaterThanOrEqual(0);
					expect(res.body).toHaveProperty('image_url');
					expect(typeof res.body.image_url).toEqual('string');
					expect(res.body.image_url).toEqual(body.image_url);
					expect(res.body.image_url).not.toBeFalsy();
	
					done();
				})
		});

		it('should be response with status code 400', (done) => {
			// Setup
			const body = {
				name: '',
				stock: -1,
				price: -1,
				image_url: ''
			};
			// Execute
			request(app)
				.post('/products')
				.send(body)
				.set('access_token', access_token1)
				.end((err, res) => {
					if(err) done(err);
	
					// Assert
					expect(res.statusCode).toEqual(400);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('errors');
					expect(Array.isArray(res.body.errors)).toEqual(true);
					expect(res.body.errors).toEqual(
						expect.arrayContaining(['Name is required']),
						expect.arrayContaining(['Image is required']),
						expect.arrayContaining(['Stock must be greater or equal 0']),
						expect.arrayContaining(['Price must be greater or equal 0']),
					);
					
					done();
				})
		});

		describe('user role not admin', () => {
			it('should be response with status code 403', (done) => {
				const body = {
					name: 'Key-chain Luffy',
					stock: 20,
					price: 20000,
					image_url: 'https://images-na.ssl-images-amazon.com/images/I/516oWi4IkuL._AC_.jpg'
				};
				
				request(app)
				.post('/products')
				.send(body)
				.set('access_token', access_token2)
				.end((err, res) => {
					if (err) done(err);
					
					expect(res.statusCode).toEqual(403);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('msg', 'This user is not admin');
						
					done();
				});
	
			});
		});
	});
});

describe('GET /products', () => {
	describe('Get all products', () => {
		it('should be response with status code 200', (done) => {
			// Execute
			request(app)
				.get('/products')
				.set('access_token', access_token1)
				.end((err, res) => {
					if (err) done(err);
					
					expect(res.statusCode).toEqual(200);
					expect(Array.isArray(res.body)).toEqual(true);
					done();
				});
		});

		it('should be response with status code 403', (done) => {
			// Execute
			request(app)
				.get('/products')
				.set('access_token', access_token2)
				.end((err, res) => {
					if (err) done(err);

					console.log(res.body);
					expect(res.statusCode).toEqual(403);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('msg', 'This user is not admin');
					done();
				});
		});
	});
});

describe('PUT /products/:id', () => {
	describe('Update the product', () => {
		it('should be response with status code 200', async (done) => {
			// Setup
			const name = 'Key-chain Luffy';
			let body = {
				name: 'Key-chain Luffy',
				stock: 10,
				price: 10000,
				image_url: 'https://images-na.ssl-images-amazon.com/images/I/516oWi4IkuL._AC_.jpg'
			};
			let id = null;
			await Product.findOne({ where: { name: name } })
			.then(product => {
				id = product.id;
				done();
			})
			.catch(err => {
				console.log(err);
			});

			request(app)
				.put(`/products/${id}`)
				.send(body)
				.set('access_token', access_token1)
				.end((err, res) => {
					if (err) done(err);

					expect(res.statusCode).toEqual(200);
					expect(typeof res.body).toEqual('object');
					expect(res.body[0].name).toEqual(body.name);
					done();
				});
		});

		it('should be response with status code 400', (done) => {
			// Setup
			const name = 'Key-chain Luffy';
			const body = {
				name: '',
				stock: -1,
				price: -1,
				image_url: ''
			};
			let id = null;
			Product.findOne({ where: { name: name } })
			.then(product => {
				id = product.id;
				done();
			})
			.catch(err => {
				console.log(err);
			});
			// Execute
			request(app)
				.put(`/products/${id}`)
				.send(body)
				.set('access_token', access_token1)
				.end((err, res) => {
					if(err) done(err);
	
					// Assert
					expect(res.statusCode).toEqual(400);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('errors');
					expect(Array.isArray(res.body.errors)).toEqual(true);
					expect(res.body.errors).toEqual(
						expect.arrayContaining(['Name is required']),
						expect.arrayContaining(['Image is required']),
						expect.arrayContaining(['Stock must be greater or equal 0']),
						expect.arrayContaining(['Price must be greater or equal 0']),
					);
					
					done();
				})
		});

		it('should be response with status code 403', async (done) => {
			// Setup
			const name = 'Key-chain Luffy';
			let body = {
				name: 'Key-chain Luffy',
				stock: 10,
				price: 10000,
				image_url: 'https://images-na.ssl-images-amazon.com/images/I/516oWi4IkuL._AC_.jpg'
			};
			let id = null;
			await Product.findOne({ where: { name: name } })
			.then(product => {
				id = product.id;
				done();
			})
			.catch(err => {
				console.log(err);
			});

			// Execute
			request(app)
				.put(`/products/${id}`)
				.send(body)
				.set('access_token', access_token2)
				.end((err, res) => {
					if (err) done(err);

					console.log(res.body);
					expect(res.statusCode).toEqual(403);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('msg', 'This user is not admin');
					done();
				});
		});

		it('should be response with status code 404', (done) => {
			// Setup
			let body = {
				name: 'Key-chain Luffy',
				stock: 10,
				price: 10000,
				image_url: 'https://images-na.ssl-images-amazon.com/images/I/516oWi4IkuL._AC_.jpg'
			};
			let id = 1000;

			// Execute
			request(app)
				.put(`/products/${id}`)
				.send(body)
				.set('access_token', access_token1)
				.end((err, res) => {
					if (err) done(err);

					console.log(res.body);
					expect(res.statusCode).toEqual(404);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('msg', 'Product not found');
					done();
				});
		});
	});
});

describe('PATCH /products/:id', () => {
	describe('Edit stock product', () => {
		it('should be response with status code 200', async (done) => {
			// Setup
			const name = 'Key-chain Luffy';
			let body = {
				stock: 5
			};
			let id = null;
			await Product.findOne({ where: { name: name } })
			.then(product => {
				id = product.id;
				done();
			})
			.catch(err => {
				console.log(err);
			});

			request(app)
				.patch(`/products/${id}`)
				.send(body)
				.set('access_token', access_token1)
				.end((err, res) => {
					if (err) done(err);
					
					expect(res.statusCode).toEqual(200);
					expect(typeof res.body).toEqual('object');
					expect(res.body.name).toEqual(body.name);
					done();
				});
		});

		it('should be response with status code 400', (done) => {
			// Setup
			const name = 'Key-chain Luffy';
			const body = {
				stock: -1,
			};
			let id = null;
			Product.findOne({ where: { name: name } })
			.then(product => {
				id = product.id;
				done();
			})
			.catch(err => {
				console.log(err);
			});
			// Execute
			request(app)
				.patch(`/products/${id}`)
				.send(body)
				.set('access_token', access_token1)
				.end((err, res) => {
					if(err) done(err);
	
					// Assert
					expect(res.statusCode).toEqual(400);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('errors');
					expect(Array.isArray(res.body.errors)).toEqual(true);
					expect(res.body.errors).toEqual(
						expect.arrayContaining(['Stock must be greater or equal 0'])
					);
					
					done();
				})
		});

		it('should be response with status code 403', async (done) => {
			// Setup
			const name = 'Key-chain Luffy';
			let body = {
				stock: 10,
			};
			let id = null;
			await Product.findOne({ where: { name: name } })
			.then(product => {
				id = product.id;
				done();
			})
			.catch(err => {
				console.log(err);
			});

			// Execute
			request(app)
				.patch(`/products/${id}`)
				.send(body)
				.set('access_token', access_token2)
				.end((err, res) => {
					if (err) done(err);

					console.log(res.body);
					expect(res.statusCode).toEqual(403);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('msg', 'This user is not admin');
					done();
				});
		});

		it('should be response with status code 404', (done) => {
			// Setup
			let body = {
				stock: 10,
			};
			let id = 1000;

			// Execute
			request(app)
				.patch(`/products/${id}`)
				.send(body)
				.set('access_token', access_token1)
				.end((err, res) => {
					if (err) done(err);

					console.log(res.body);
					expect(res.statusCode).toEqual(404);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('msg', 'Product not found');
					done();
				});
		});
	});
});

describe('DELETE /products/:id', () => {
	describe('Delete product', () => {
		it('should be response with status code 200', async (done) => {
			// Setup
			const name = 'Key-chain Luffy';
			let id = null;
			await Product.findOne({ where: { name: name } })
			.then(product => {
				id = product.id;
				done();
			})
			.catch(err => {
				console.log(err);
			});

			request(app)
				.delete(`/products/${id}`)
				.set('access_token', access_token1)
				.end((err, res) => {
					if (err) done(err);
					
					expect(res.statusCode).toEqual(200);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('msg', 'Product has been deleted');
					done();
				});
		});

		it('should be response with status code 403', async (done) => {
			// Setup
			const name = 'Key-chain Luffy';
			let id = null;
			await Product.findOne({ where: { name: name } })
			.then(product => {
				id = product.id;
				done();
			})
			.catch(err => {
				console.log(err);
			});

			// Execute
			request(app)
				.delete(`/products/${id}`)
				.set('access_token', access_token2)
				.end((err, res) => {
					if (err) done(err);

					expect(res.statusCode).toEqual(403);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('msg', 'This user is not admin');
					done();
				});
		});

		it('should be response with status code 404', (done) => {
			// Setup
			let id = 1000;

			// Execute
			request(app)
				.delete(`/products/${id}`)
				.set('access_token', access_token1)
				.end((err, res) => {
					if (err) done(err);

					console.log(res.body);
					expect(res.statusCode).toEqual(404);
					expect(typeof res.body).toEqual('object');
					expect(res.body).toHaveProperty('msg', 'Product not found');
					done();
				});
		});
	});
});