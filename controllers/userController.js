const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
  static async register(req, res, next) {
    try {
      let {email, password, role, username} = req.body
      let user = await User.create({email, password, role, username})

      res.status(201).json(user)
    } catch(error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    // res.status(200).json({
    //   access_token: 'asdasdasd',
    //   id: 1,
    //   email: 'asdf@mail.com',
    //   username: 'asdf'
    // })

    try {
      let { email, password } = req.body
      let user = await User.findOne({where: {email}})

      if (!user) {
        next({name: 'invalidLogin'})
      } else {
        if (!comparePassword(password, user.password)) {
          next({name: 'invalidLogin'})
        } else {
          const access_token = generateToken({
            id: user.id,
            email: user.email
          })
          const userLogin = {
            id: user.id,
            email: user.email,
            username: user.username,
            access_token: access_token
          }

          res.status(200).json(userLogin)
        }
      }
    } catch(error) {
      next(error)
    }
  }
}

module.exports = { UserController }