const { User } = require('../models')

class UserController {
  static register (req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(input)
      .then(user => {
        const output = {
          id: user.id,
          email: user.email
        }
        res.status(201).json(output)
      })
      .catch(err => {
        console.log(err, err.message, '<<<<< di error register');
        if (err.name === 'SequelizeValidationError') {
          res.status(400).json({
            message: err.message
          })
        } else {
          res.status(500).json({
            message: 'Internal server error'
          })
        }
      })
  }

  static login (req, res, next) {}
}

module.exports = UserController;