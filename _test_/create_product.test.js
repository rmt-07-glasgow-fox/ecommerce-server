const request = require('supertest');

describe('POST /products', () => {
	it('should be response with status code 201', (done) => {
		// Setup
		const body = {
			name: 'Key-chain Luffy',
			stock: 20,
			price: 20000,
			image_url: 'https://images-na.ssl-images-amazon.com/images/I/516oWi4IkuL._AC_.jpg'
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
				expect(typeof res.body.name).toEqual('string');
				expect(res.body.name).toEqual(body.name);
				expect(res.body.name).not.toBeFalsy();
				expect(res.body).toHaveProperty('stock');
				expect(res.body).toHaveProperty('price');
				expect(res.body).toHaveProperty('image_url');
				done();
			})
	});
});