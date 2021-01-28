const request = require("supertest")
const app = require("../../app")
const {clearBanners} = require("../helpers/clear")
const models = require("../../models")
const {User, Banner} = require("../../models")
const {generateToken} = require("../../helpers/jwt")

let access_token_admin = null
let access_token_customer = null
let bannerTest = null

describe('PUT /banners/:id', () => {
    beforeAll((done) => {
        User.findOne({where: {email: 'admin@mail.com'}})
        .then(user => {
            const {id, email, role} = user
            access_token_admin = generateToken({id, email, role})
            return User.findOne({where: {email: 'akira@mail.com'}})
        })
        .then(user => {
            const {id, email, role} = user
            access_token_customer = generateToken({id, email, role})
            const inputBanner = {
                title: 'diskon',
                status: 'active',
                imageUrl: 'test.com'
            }
            return Banner.create(inputBanner)
        })
        .then(banner => {
            bannerTest = banner
            done()
        })
        .catch(err => console.log(err))
    })
    
    afterAll((done) => {
        clearBanners()
        .then(() => {
        models.sequelize.close()
        done()
        })
        .catch(err => console.log(err))
    })

    it('should send response with 200 status code', (done) => {
        const body = {
            title: 'diskon',
            status: 'active',
            imageUrl: 'test2.com'
        };

        request(app)
        .put(`/banners/${bannerTest.id}/edit`)
        .send(body)
        .set('access_token', access_token_admin)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual("edit banner successfull");

            done()
        })

    })

    it('should send response with 401 status code when does not have access_token', (done) => {
        const body = {
            title: 'diskon',
            status: 'active',
            imageUrl: 'test2.com'
        };

        request(app)
        .put(`/banners/${bannerTest.id}/edit`)
        .send(body)
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
        const body = {
            title: 'diskon',
            status: 'active',
            imageUrl: 'test2.com'
        };

        request(app)
        .put(`/banners/${bannerTest.id}/edit`)
        .set('access_token', access_token_customer)
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Access Denied! Please login first')
 
            done()
        })

    })

    it('should send response with 400 status code with empty name', (done) => {
        const body = {
            title: '',
            status: 'active',
            imageUrl: 'test2.com'
        };

        request(app)
        .put(`/banners/${bannerTest.id}/edit`)
        .set('access_token', access_token_admin)
        .send(body)
        .end((err, res) => {
            if(err) done(err)

            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual(['title is required'])
 
            done()
        })

    })

})