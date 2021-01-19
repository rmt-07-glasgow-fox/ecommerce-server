const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class authController {
  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: { email }
    })
    .then(data => {
      if(!data) {
        next({ name: 'invalidEmailPassword' })
      }
      const match = checkPassword(password, data.password)
      if(match) {
        const payload = {
          id: data.id,
          email: data.email,
          role: data.role
        }
        const access_token = generateToken(payload)
        res.status(200).json({ access_token })
      } else {
        next({ name: 'invalidEmailPassword' })
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = authController