const { User } = require ('../models/index')
const { checkPassword } =  require ('../helpers/bcrypt')
const { generateToken } = require ('../helpers/jwt')

class UserController {
  static async register (req, res, next) {
    try {
      const { email, password } = req.body
      let data = await User.create ({
        email, 
        password,
        role: 'customer'
      })
      res.status (201).json ({ id: data.id, email: data.email, role: data.role })
    } catch (err) {
      next (err)
    }
  }

  static async login (req, res, next) {
    try {
      const { email, password } = req.body
      let data = await User.findOne ({
        where: {
          email
        }
      })
      if (!data) {
        next ({name: 'Invalid email / password'})
      } else {
        let checked = checkPassword (password, data.password)
        if (!checked) {
          next ({name: 'Invalid email / password'})
        } else {
          const payload = {
            id: data.id,
            email: data.email,
            role: data.role
          }
          const access_token = generateToken (payload)
          res.status (200).json ({access_token, role: data.role})
        }
      }
    } catch (err) {
      next (err)
    }
  }
}

module.exports = UserController