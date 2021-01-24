const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { User,sequelize,Product } = require('../models')
const { queryInterface } = sequelize
const userAdmin = {
    email: 'mail@email.com',
    password: 'binmail',
    role: 'admin'
}

describe("test login",function(){

    describe("POST /login sukses", function(){

        test("login sukses",(done)=>{
            request(app)
                .post('/login')
                .set('Accept','application/json')
                .send(userAdmin)
                .then(response=>{
                    const {body, status} = response

                    expect(status).toBe(200)
                    expect(body).toHaveProperty('access_token', expect.any(String))
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })
    })

    describe("POST /login gagal", function(){
  
        test("email ada password salah",(done)=>{
            let {email, password, role} = userAdmin
            password = "bukanpasswordasli"
            request(app)
                .post('/login')
                .set('Accept','application/json')
                .send({
                    email,
                    password,
                    role
                })
                .then(response=>{
                    const {body, status} = response

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'invalid email / password')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("email tidak ada di db",(done)=>{
            let {email, password, role} = userAdmin
            email = "ultraman@email.com"
            request(app)
                .post('/login')
                .set('Accept','application/json')
                .send({
                    email,
                    password,
                    role
                })
                .then(response=>{
                    const {body, status} = response

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'invalid email / password')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("tidak memasukkan email dan password",(done)=>{
            let {email, password, role} = userAdmin
            email = ""
            password = ""
            request(app)
                .post('/login')
                .set('Accept','application/json')
                .send({
                    email,
                    password,
                    role
                })
                .then(response=>{
                    const {body, status} = response

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'invalid email / password')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })
    })
})

describe("test product apis",function(){
    let access_token_admin = ''
    let access_token_user = ''
    let product = {}
    let newProduct = {
        name: 'swallow',
        image_url: 'image.google.com/swallow.png',
        price: 40000,
        stock: 2
    }

    beforeAll((done)=>{
        User.findOne({
            where: {
                email: 'mail@email.com'
            }
        })
        .then(({id, email, role})=>{
            access_token_admin = generateToken({
                id,email,role
            })

            return User.findOne({
                where: {
                    email: 'ultraman@email.com'
                }
            })
        })
        .then(({id, email, role})=>{
            access_token_user = generateToken({
                id, email, role
            })

            // console.log(access_token_admin,'_______token admin');
            // console.log(access_token_user,'_______token user');

            return Product.create({            
                name: 'adadas',
                image_url: 'google.image.adadas.png',
                price: 300000,
                stock: 5
            })
        })
        .then(resProduct=>{
            product = {
                id: resProduct.id,
                name: resProduct.name,
                image_url: resProduct.image_url,
                price: resProduct.price,
                stock: resProduct.stock
            }
            done()
        })
        .catch(err=>{
            console.log(err);
        })
    })

    afterAll((done)=>{
        queryInterface.bulkDelete('Products')
        .then(()=>{
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    describe("sukses case", function(){
        test("POST /products : create product sukses",(done)=>{
            // console.log(product);
            request(app)
                .post('/products')
                .set('Accept','application/json')
                .set('access_token',access_token_admin)
                .send(newProduct)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(201)
                    expect(body).toHaveProperty('id', expect.any(Number))
                    expect(body).toHaveProperty('name', newProduct.name)
                    expect(body).toHaveProperty('image_url', newProduct.image_url)
                    expect(body).toHaveProperty('price', newProduct.price)
                    expect(body).toHaveProperty('stock', newProduct.stock)
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("PUT /products/:id : update product sukses",(done)=>{
            request(app)
                .put(`/products/${product.id}`)
                .set('Accept','application/json')
                .set('access_token',access_token_admin)
                .send(newProduct)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(200)
                    expect(body).toHaveProperty('id', expect.any(Number))
                    expect(body.name).not.toEqual( product.name)
                    expect(body.image_url).not.toEqual( product.image_url)
                    expect(body.price).not.toEqual( product.price)
                    expect(body.stock).not.toEqual( product.stock)
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("DELETE /products/:id : delete product sukses",(done)=>{
            request(app)
                .delete(`/products/${product.id}`)
                .set('Accept','application/json')
                .set('access_token',access_token_admin)
                .then(response=>{

                    const {body, status} = response
                    expect(body).toHaveProperty('message', 'delete product success')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })
    })

    describe("failed case", function(){

        /////test failed create/////////////
        test("POST /products : tidak menyertakan access_token",(done)=>{
            request(app)
                .post('/products')
                .set('Accept','application/json')
                .send(product)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'You must login first')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("POST /products : menyertakan access_token tapi bukan admin",(done)=>{
            request(app)
                .post('/products')
                .set('Accept','application/json')
                .set('access_token',access_token_user)
                .send(product)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(403)
                    expect(body).toHaveProperty('message', 'You don\'t have access only admin')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("POST /products : field yang required tidak diisi",(done)=>{
            let testProduct = {
                name: '',
                image_url: 'image',
                price: 30000,
                amount: 5
            }
            request(app)
                .post('/products')
                .set('Accept','application/json')
                .set('access_token',access_token_admin)
                .send(testProduct)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message','Product\'s name can\'t be empty')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("POST /products : stock diisi angka minus",(done)=>{
            let testProduct = {
                name: 'gambar',
                image_url: 'image',
                price: 30000,
                stock: -1000
            }
            request(app)
                .post('/products')
                .set('Accept','application/json')
                .set('access_token',access_token_admin)
                .send(testProduct)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message','stock can\'t be lower than 0')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("POST /products : price diisi angka minus",(done)=>{
            let testProduct = {
                name: 'gambar',
                image_url: 'image',
                price: -30000,
                stock: 5
            }
            request(app)
                .post('/products')
                .set('Accept','application/json')
                .set('access_token',access_token_admin)
                .send(testProduct)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message','price can\'t be lower than 0')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("POST /products : field diisi tipe tidak sesuai",(done)=>{
            let testProduct = {
                name: 'gambar',
                image_url: 'image',
                price: 30000,
                stock: 'stonks'
            }
            request(app)
                .post('/products')
                .set('Accept','application/json')
                .set('access_token',access_token_admin)
                .send(testProduct)
                .then(response=>{

                    const {body, status} = response
                    console.log(body.err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message','invalid input data type')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        /////////test failed update/////////////////

        test("PUT /products/:id : tidak menyertakan access_token",(done)=>{
            request(app)
                .put(`/products/${product.id}`)
                .set('Accept','application/json')
                .send(product)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'You must login first')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("PUT /products/:id : menyertakan access_token tapi bukan admin",(done)=>{
            request(app)
                .put(`/products/${product.id}`)
                .set('Accept','application/json')
                .set('access_token',access_token_user)
                .send(product)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(403)
                    expect(body).toHaveProperty('message', 'You don\'t have access only admin')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("PUT /products/:id : stock diisi angka minus",(done)=>{
            let testProduct = {
                name: 'gambar',
                image_url: 'image',
                price: 30000,
                stock: -1000
            }
            request(app)
                .put(`/products/${product.id}`)
                .set('Accept','application/json')
                .set('access_token',access_token_admin)
                .send(testProduct)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message','stock can\'t be lower than 0')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("PUT /products/:id : price diisi angka minus",(done)=>{
            let testProduct = {
                name: 'gambar',
                image_url: 'image',
                price: -30000,
                stock: 5
            }
            request(app)
                .put(`/products/${product.id}`)
                .set('Accept','application/json')
                .set('access_token',access_token_admin)
                .send(testProduct)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message','price can\'t be lower than 0')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("PUT /products/:id : field diisi tipe tidak sesuai",(done)=>{
            let testProduct = {
                name: 'gambar',
                image_url: 'image',
                price: 30000,
                stock: 'stonks'
            }
            request(app)
                .put(`/products/${product.id}`)
                .set('Accept','application/json')
                .set('access_token',access_token_admin)
                .send(testProduct)
                .then(response=>{

                    const {body, status} = response
                    console.log(body.err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message','invalid input data type')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        /// test failed delete ////////////////////

        test("DELETE /products/:id : tidak menyertakan access_token",(done)=>{
            request(app)
                .delete(`/products/${product.id}`)
                .set('Accept','application/json')
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'You must login first')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        test("DELETE /products/:id : menyertakan access_token tapi bukan admin",(done)=>{
            request(app)
                .delete(`/products/${product.id}`)
                .set('Accept','application/json')
                .set('access_token',access_token_user)
                .then(response=>{

                    const {body, status} = response

                    expect(status).toBe(403)
                    expect(body).toHaveProperty('message', 'You don\'t have access only admin')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })
    })
})