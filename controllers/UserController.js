const { User } = require('../models')
const { comparePwd } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {

  static login(req, res, next) {
    const { email, password } = req.body

    if (!email || !password) {
      next({name: 'InvalidPassOrEmail'})
    }

    User.findOne({ where: {email} })
      .then(user => {
        if (!user) {
          next({ name: 'InvalidPassOrEmail' })
        } else {
          const isMatch = comparePwd(password, user.password)
          if (!isMatch) {
            next({ name: 'InvalidPassOrEmail' })
          } else {
            const payload = { id: user.id, email: user.email }
            const access_token = generateToken(payload)
            res.status(200).json({ access_token })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = UserController