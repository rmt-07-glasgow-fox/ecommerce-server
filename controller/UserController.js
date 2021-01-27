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
        role: 'customer',
        balance: 0
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
          res.status (200).json ({access_token, id: data.id, role: data.role, email:data.email})
        }
      }
    } catch (err) {
      next (err)
    }
  }

  static async getBalance (req, res, next) {
    try {
      let data = await User.findByPk(+req.user, {
        attributes: ['balance']
      })
      res.status (200).json (data)
    } catch (err) {
      next (err)
    }
  }

  static async updateBalance (req, res, next) {
    try {
      const checkBalance = await User.findByPk(req.user)
      const newBalance = +req.body.balance + checkBalance.balance
      let data = await User.update({balance: newBalance}, {
        where: {
          id: req.user
        }
      })

      res.status (200).json ({message: `Balance updated, current amount: ${newBalance}`, balance: newBalance})
    } catch (err) {
      next (err)
    }
  }

  static async reduceBalance (req, res, next) {
    try {
      const checkBalance = await User.findByPk(req.user)
      checkBalance.decrement ('balance', {by: +req.body.balance})
      res.status (200).json ({message: `Balance reduced, current amount: ${checkBalance}`, balance: checkBalance.balance})
    } catch (err) {
      next (err)
    }
  }
}

module.exports = UserController