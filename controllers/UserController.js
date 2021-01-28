const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class UserController {
  static login(req, res, next) {
    const { email, password } = req.body

    if (!email) next({ name: "NoMail" });
    if (!password) next({ name: "NoPassword" });

    User.findOne({
      where: {
        email
      },
    })
      .then((user) => {
        if (!user) {
          return next({
            name: "InvalidEmail",
          })
        }
        const truePassword = comparePassword(password, user.password)
        if (!truePassword) {
          return next({
            name: "InvalidPassword",
          })
        }
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role,
        }
        const access_token = generateToken(payload)
        // req.headers.access_token = access_token
        return res.status(200).json({
          id: user.id,
          email: user.email,
          role: user.role,
          access_token,
        })
      })
      .catch((err) => {
        next(err)
      })
  }
  static register (req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password,
      role: ''
    }
    User.create(payload)
    res.status(201).json(payload)
    .catch (err => {
      next(err)
    })
  }
}

module.exports = UserController
