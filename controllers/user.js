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
      const {id, name, email, password, role} = user
      return res.status(201).json({id, name, email, role})
    })
    .catch(next)
  }

  static login(req, res, next) {

    const {email, password} = req.body

    User.build({email, password})
    .validate()
    .then(() => {
      return User.findOne({where: {email}})
    })
    .then(user => {
      if (!user) {
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
    })
    .catch(next)
  }
}

module.exports = UserController