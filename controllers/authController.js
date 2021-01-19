const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const { User } = require('../models')

class AuthController {
  static register(req, res, next) {
    const { name, email, password, role } = req.body
    User.create({ name, email, password, role })
      .then(user => {
        const { id, name, email, role } = user
        res.status(201).json({ id, name, email, role })
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    if (!email && !password) {
      res.status(400).json({ message: 'Email or password cannot be empty!' })
    } else {
      User.findOne({ where: { email }})
        .then(user => {
          if (user && comparePassword(password, user.password)) {
            const { id, name, email, role } = user
            const access_token = generateToken({ id, name, email, role })
            res.status(200).json({ access_token })
          } else {
            res.status(400).json({ message: 'Email or password wrong!' })
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Internal server error'})
        })
    }
  }
}

module.exports = AuthController