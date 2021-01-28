const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const { email, password, role } = req.body
        const obj = {
            email,
            password,
            role
        }
        User.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static async login(req, res, next) {
        console.log('masuk login')
        try {
            const { email, password } = req.body
    
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                console.log('ga ada email')
                next({name: 'Invalid Email / Password'})
            } else {
                const isValidPass = comparePass(password, user.password)
                if (isValidPass) {
                    const payload = {
                        id: user.id,
                        email: user.email
                    }
                    const access_token = generateToken(payload)
                    const userData = {
                      access_token,
                      email: user.email,
                      role: user.role
                    }
                    return res.status(200).json(userData)
                } else {
                    next({name: 'Invalid Email / Password'})
                }
            }
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static googleLogin(req, res, next){
        const { id_token } = req.body
        let email
        const client = new OAuth2Client('client id google');
        client.verifyIdToken({
          idToken: id_token,
          audience: 'client id google'
        })
          .then(data => {
            const payload = data.getPayload()
            email = payload.email
            return User.findOne({
              where:{
                email
              }
            })
          })  
          .then(user => {
            if (!user) {
              return User.create({
                email,
                password: (Math.random()*1000000).toString()
              })
            } else {
              return user
            }
          })
          .then(data => {
            let access_token = generateToken({
              id: data.id,
              email: data.email
            })
            res.status(200).json({
              access_token,
              data
            })
          })
          .catch(err => {
            next(err)
          })
      }
}

module.exports = { UserController }