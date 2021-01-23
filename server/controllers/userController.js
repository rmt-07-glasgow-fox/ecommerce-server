const { User } = require('../models')
const { decrypt, generateToken } =require('../helpers')

class UserController{
  static handleLogin(req, res, next){
    let email = req.body.email
    let password = req.body.password
    console.log(email);
    User.build({ email, password })
    .validate()
    .then(() => {
      return User.findOne({
        where: { email }
      })
    })
    .then(data => {
      if(data){
        if(decrypt(password, data.password)){
          let access_token = generateToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({access_token})
        } else {
          next({
            status: 401,
            message: "Invalid Email/Password"
          })
        }
      } else {
        next({
          status: 401,
          message: "Email not registered"
        })
      }
    }).catch(err => {
      if (err.name == "SequelizeValidationError") {
        next({
          status: 400,
          errors: err.errors
        })
      } else {
        next(err)
      }
    })
  }
}

module.exports = UserController