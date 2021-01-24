const { User } = require('../models')
const { checkHash } = require('../helpers/hashPassword')
const { createToken } = require('../helpers/jwt')

class userController {

  static login (req, res, next) {
    let { email, password } = req.body

    if (!email) {
      next({ name: 'WrongEmail' })
    } else {
      User.findOne({
        where: {
          email
        }
      })
        .then(user => {
          if (!user) {
            next({ name: 'WrongEmail' })
          } else if (!checkHash(password, user.password)) {
            next({ name: 'WrongPassword' })
          } else {
            res.status(200).json({
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              role: user.role,
              access_token: createToken({
                id: user.id,
                fullName: user.fullName,
                email: user.email
              })
            })
          }
        })
        .catch(next)
    }
  }
}

module.exports = userController
