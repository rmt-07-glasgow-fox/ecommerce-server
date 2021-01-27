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
            const payload = {
              id: user.id,
              fullName: user.fullName,
              email: user.email
            }
            payload.access_token = createToken(payload)
            payload.role = user.role

            res.status(200).json(payload)
          }
        })
        .catch(next)
    }
  }

  static register (req, res, next) {
    const { fullName, email, password } = req.body
    const newUser = { fullName, email, password }

    User.create(newUser)
      .then(user => {
        const payload = {
          id: user.id,
          fullName: user.fullName,
          email: user.email
        }
        payload.access_token = createToken(payload)

        res.status(201).json(payload)
      })
      .catch(next)
  }
}

module.exports = userController
