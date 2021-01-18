const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')

class UserController {
  static async login (req, res, next) {
    try {
      const { email, password } = req.body
      const loginUser = await User.findOne({
        where: {
          email
        }
      })
      if(!loginUser) {
        res.status(401).json({ message: "Invalid username / password"})
      }
      const successLogin = comparePassword(password, loginUser.password)
      if (successLogin) {
        const access_token = {
          access_token : ' berhasil login '
        }
        res.status(200).json(access_token)
      } else {
        res.status(401).json({ message: "Invalid username / password"})
      }
    } catch (err) {
      next(err)
      // res.status(401).json({ message: "Invalid username / password"})
    }
  }
}

module.exports = UserController