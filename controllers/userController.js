const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt');

class UserController {
  static login(req,res,next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if(!user) {
        throw {
          status: 401,
          message: "invalid email or password"
        }
      } else if (comparePassword(req.body.password, user.password)) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({access_token,user})
      } else {
        throw {
          status: 401,
          message: "invalid email or password"
        }
      }
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
  }
  static register (req,res,next) {
    const {email,password,first_name,last_name} = req.body
    User.create({
      email,
      password,
      first_name,
      last_name
    })
      .then(data => {
        const result = {
          id: data.id,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name
        }
        return res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController