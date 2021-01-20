require('dotenv').config()
const {User} = require('../models')
const {compareHash} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
// const {OAuth2Client} = require('')
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class Controller {
  static login = async(req, res, next) => {
    try {
      !req.body.email.length ? res.status(400).json({errors:['Email is required']}) : req.body.email
      !req.body.password.length ? res.status(400).json({errors:['Password is required']}) : req.body.password
      const data = {
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.findOne({where: {email: data.email}})
      if (user) {
        if (compareHash(data.password, user.password)) {
          const access_token = generateToken({id: user.id, email: user.email, role: user.role})
          res.status(200).json({access_token})
        } else {
          res.status(400).json({errors:['Wrong password']})
        }
      } else {
        res.status(400).json({errors:['Email does not exist']})
      }
    } catch (error) {
      next(error)
    }
  }

  static register = async (req, res, next) => {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
        role: 'customer'
      }
      const user = await User.create(data)
      res.status(201).json({id: user.id, email: user.email})
    } catch (error) {
      next(error)
    }
  }
}
module.exports = Controller