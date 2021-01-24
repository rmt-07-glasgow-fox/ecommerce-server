const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {

  static login (req, res, next) {
    let { email, password } = req.body
    User.findOne({where: {email: email}})
    .then(user => {
      if (user && comparePassword(password, user.password)) {
        let payload = {
          id: user.id,
          email: user.email,
          role: user.role,
        }
        let access_token = generateToken(payload)
        req.headers.access_token = access_token
        res.status(200).json({access_token})
      } else {
        throw {name: 404, message: 'wrong username/password'}
      }
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = Controller;