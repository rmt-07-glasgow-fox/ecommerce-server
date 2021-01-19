const request = require('supertest')
const app = require('../app')

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