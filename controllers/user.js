const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if (user) {
          const match = comparePassword(password, user.password)

          if (match) {
            res.status(200).json(user)
          }
        }
      })
      .catch(next)
  }
}

module.exports = UserController
