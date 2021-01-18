const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static login (req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      where: {
        email: input.email
      }
    })
      .then(user => {
        if (user) {
          const checkPass = checkPassword(input.password, user.password)

          if (checkPass) {
            const payload = {
              id: user.id,
              email: user.email
            }
  
            const access_token = generateToken(payload)
  
            res.status(200).json({ access_token })
          } else {
            res.status(401).json({
              message: 'Invalid email or password'
            })
          }
        } else {
          res.status(401).json({
            message: 'Invalid email or password'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Internal server error'
        })
      })
  }
}

module.exports = UserController;