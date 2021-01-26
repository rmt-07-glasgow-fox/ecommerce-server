const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateAccessToken } = require('../helpers/jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {

    static async loginAdmin(req, res, next) {
        const payload = {
            email: req.body.email || '',
            password: req.body.password || ''
        }

        try {
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                throw {
                    status: 401,
                    message: `Wrong Email or Password`
                }
            } else {
                if (user.role !== 'admin') {
                    throw {
                        status: 403,
                        message: `You Don't Have Access To This Panel`
                    }
                } else {
                    if (comparePassword(payload.password, user.password)) {
                        const access_token = generateAccessToken({
                            id: user.id,
                            email: user.email,
                            role: user.role
                        })

                        res.status(200).json({access_token})
                    } else {
                        throw {
                            status: 401,
                            message: `Wrong Email or Password`
                        }
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }

  static async loginCustomer (req, res, next) {
      const payload = {
        email: req.body.email || '',
        password: req.body.password || ''
      }
  
      try {
        const user = await User.findOne({
          where: {
            email: payload.email
          }
        })
  
        if (!user) {
            throw {
                status: 400,
                message: `Wrong Email or Password`
            }
        } else {
            if (user.role !== 'customer') {
                throw {
                    status: 403,
                    message: `Admin Account Cannot Be Used In Customer Side`
                }
            } else {
                if (comparePassword(payload.password, user.password)) {
                    const access_token = generateAccessToken({
                        id: user.id,
                        email: user.email,
                        role: user.role
                    })
  
                    res.status(200).json({access_token})
                } else {
                    throw {
                        status: 400,
                        message: `Wrong Email or Password`
                    }
                }
            }
        }
      } catch (error) {
        next(error)
      }
    }
  
  static async loginGoogle (req, res, next) {
      try {
          const ticket = await client.verifyIdToken({
              idToken: req.body.google_token,
              audience: process.env.GOOGLE_CLIENT_ID
          });
  
          const payload = ticket.getPayload()
          const userlogin = await User.findOne({
              where: {
                  email: payload.email
              }
          })
  
          if (userlogin) {
            const access_token = generateAccessToken({
              id: userlogin.id,
              email: userlogin.email,
              role: userlogin.role
            })
              res.status(200).json({access_token})
          } else {
              const createuser = await User.create({
                  email: payload.email,
                  password: process.env.GOOGLE_PASSWORD
              })
              const transaction = await Transaction.create({
                status: 'uncompleted',
                history: null,
                total: 0,
                UserId: createuser.id
              })
              const access_token = generateAccessToken({
                id: createuser.id,
                email: createuser.email,
                role: createuser.role
              })
              res.status(200).json({access_token})
          }
      } catch (error) {
          next(error)
      }
    }
  
    static async register (req, res, next) {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
  
  
      try {
        const user = await User.create(payload)
        const transaction = await Transaction.create({
          status: 'uncompleted',
          history: null,
          total: 0,
          UserId: user.id
        })
  
        res.status(200).json({ id: user.id, email: user.email })
      } catch (error) {
        next(error)
      }
    }
    
    static async getUser (req, res, next) {
      const id = req.loggedIn.id
      try {
        const user = await User.findOne({
          where: {
            id
          }
        })
  
        res.status(200).json({
          id: user.id,
          email: user.email,
          role: user.role
        })
      } catch (error) {
        next(error)
      }
    } 

}

module.exports = UserController