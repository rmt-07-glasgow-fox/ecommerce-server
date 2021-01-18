const request = require('supertest')
const app = require('../app')
const { generateToken, verifyJWT } = require('../helper/jwt')


const admin = {
    email: 'admin@mail.com',
    password: 1234,
    role: 'admin'
}
const customers = {
    email: 'test@mail.com',
    password: test,
    role: 'customer'
}
let admin_token
let customer_token

beforeAll(() => {
    admin_token = generateToken(admin)
    customer_token = generateToken(customers)
}),
describe('POST /product', ()=> {
    it('should send response (200) status code', () => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 250000,
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(201)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
    it('should send response (401) when access_token is undefined', () => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 250000,
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', '')
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('')
            done()
        })
    })
    it('should send response (401) when access_token is customer', () => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 250000,
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', customer_token)
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('customer')
            done()
        })
    })
    it('should send response (400) when name is empty', () => {
        //setup
        const body = {
            name: '',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 250000,
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
    it('should send response (400) when image_url is empty', () => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: '',
            price: 250000,
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
    it('should send response (400) when price is empty', () => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: '',
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
    it('should send response (400) when stock is empty', () => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 500000,
            stock: ''
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
    it('should send response (400) when price is minus', () => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: -500000,
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
    it('should send response (400) when stock is minus', () => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 500000,
            stock: -50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
    it('should send response (400) when price field with string', () => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 'A milion',
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
    it('should send response (400) when price stock with string', () => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 50000,
            stock: 'fifty'
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done (err)
            
            //asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
})
describe('POST /product', ()=> {

})