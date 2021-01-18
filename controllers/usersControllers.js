const { User, Product } = require('../models/index')
const { hashPassword, checkPassword} = require('../helpers/bcrypt')
const { generateToken, checkToken } = require('../helpers/jwt')

class Controller {
  static login(req, res, next) {
    let { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
      return res.status(400).json({message: "Email and password must not be empty!"})
    }

    User.findOne({
      where: {email:email},
    })
    .then((data) => {
      //if 404
      if (!data) {
        return res.status(404).json({message: "Email not found"})
      }

      //compare the password
      let isValid = checkPassword(password, data.password)
      if (!isValid) {
        return res.status(400).json({message: "Invalid password"})
      }

      //generate token
      let payload = { id: data.id, email: data.email, role:data.role }
      let token = generateToken(payload)
      return res.status(201).json({access_token: `${token}`})
    })
    .catch((err) => {
      next(err)
    })
  }
}

module.exports = Controller
