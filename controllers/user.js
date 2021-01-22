const {User} = require("../models")
const {compareHash} = require("../helpers/hash")
const {generateToken} = require("../helpers/jwt")

class UserController {
  static register(req, res, next) {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }

    User.create(newUser)
    .then(user => {
      return res.status(201).json(user)
    })
    .catch(next)
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({where: {email}})

      if (!user || password !== user.password || email !== user.email) {
        next({name: "errorLogin"})
      }

      const matchPass = compareHash(password, user.password)
      if (matchPass) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        }

        const access_token = generateToken(payload)
        return res.status(200).json({access_token})
      } else {
        next({name: "errorLogin"})
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController