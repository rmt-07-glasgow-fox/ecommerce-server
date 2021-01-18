const { User } = require('../models')
const { comparePwd } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {

  static login(req, res, next) {
    const { email, password } = req.body
    console.log(req.body, '===========')
    if (!email || !password) {
      console.log('masuk sindang 1')
      next({name: 'SequelizeValidationError'})

    } 
    User.findOne({ where: {email} })
      .then(user => {
        console.log('masuk sindang 2')
        console.log(user)
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
        console.log('masuk sindang 3')
        next(err)
      })
  }

}

module.exports = UserController