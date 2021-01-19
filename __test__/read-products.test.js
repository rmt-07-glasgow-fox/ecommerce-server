const request = require("supertest")
const app = require("../app")
const {clearProducts} = require("./helpers/clear")
const models = require("../models")
const {User} = require("../models")
const {generateToken} = require("../helpers/jwt")

let access_token_admin = null
let access_token_customer = null

describe('GET /products', () => {
    beforeAll((done) => {
        User.findOne({where: {email: 'admin@mail.com'}})
        .then(user => {
            const {id, email} = user
            access_token_admin = generateToken({id, email})
            return User.findOne({where: {email: 'akira@mail.com'}})
        })
        .then(user => {
            const {id, email} = user
            access_token_customer = generateToken({id, email})
            done()
        })
    })
    
    afterAll((done) => {
        models.sequelize.close()
    })

    it('should send response with 200 status code', (done) => {
        request(app)
        .get('/products')
        .set('access_token', access_token_admin)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual('object');
            expect(Array.isArray(res.body)).toEqual(true);
            res.body.map(el => {
                expect(el).toHaveProperty("id");
                expect(typeof el.id).toEqual("number")
                expect(el).toHaveProperty("name");
                expect(typeof el.name).toEqual("string")
                expect(el).toHaveProperty("image_url");
                expect(typeof el.image_url).toEqual("string")
                expect(el).toHaveProperty("price");
                expect(typeof el.price).toEqual("number")
                expect(el).toHaveProperty("stock");
                expect(typeof el.stock).toEqual("number")
            })

            done()
        })

    })

    it('should send response with 401 status code when does not have access_token', (done) => {
        request(app)
        .get('/products')
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Access Denied! Please login first')
 
            done()
        })

    })

    it('should send response with 401 status code with invalid token', (done) => {
        request(app)
        .get('/products')
        .set('access_token', access_token_customer)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Access Denied! Please login first')
 
            done()
        })

    })


})