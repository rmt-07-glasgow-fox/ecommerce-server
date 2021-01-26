const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email,
          role: 'admin'
        }
      })
      if(!user) {
        throw {name: 'invalidUserPassword'}
      }
      const successLogin = comparePassword(password, user.password)
      if (successLogin ) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          access_token,
        })
      } else {
        throw {name: 'invalidUserPassword'}
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async registerCustomer(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.create({
        email,
        password, 
      })
      const response = {
        id: user.id,
        email: user.email,
      }
      return res.status(201).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email,
          role: 'customer'
        }
      })
      if(!user) {
        throw {name: 'invalidUserPassword'}
      }
      const successLogin = comparePassword(password, user.password)
      if (successLogin ) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          access_token,
        })
      } else {
        throw {name: 'invalidUserPassword'}
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = UserController