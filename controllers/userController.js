const { User } = require("../models")
const { comparePass } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")


class UserController {


  static login (req, res, next) {
    let { email, password } = req.body
    User.findOne({
      where: { email }
    })
      .then(data => {
        if (!data) {
          return next({ 
            name: "WrongLogin" 
          })
        }
        let isValid = comparePass(password, data.password)
        if (!isValid) {
          return next({ name: "WrongLogin" })
        }
        let payload = {
          id: data.id,
          email: data.email,
          name: data.name
        }
        let access_token = generateToken(payload)
        res.status(200).json({
          access_token,
          email: data.email,
          name: data.name
        })
      })
      .catch(err => { 
        next(err) 
      })
  }
}

module.exports = UserController
