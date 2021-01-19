const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
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
      next(err)
    }
  }
}

module.exports = UserController