const { User } = require('../models')
const { decrypt, generateToken } =require('../helpers')

class UserController{
  // admin login
  static handleLogin(req, res, next){
    let email = req.body.email
    let password = req.body.password
    User.build({ email, password })
    .validate()
    .then(() => {
      return User.findOne({
        where: { 
          email,
          role: 'admin'
        }
      })
    })
    .then(data => {
      if(data){
        if(decrypt(password, data.password)){
          let access_token = generateToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({
            access_token,
            username: data.username
          })
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

  static customerRegister(req, res, next){
    console.log(req.body);
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(data => {
      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role
      })
    }).catch(err => {
      if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        next({
          status: 400,
          errors: err.errors
        })
      } else {
        next(err)
      }
    })
  }

  static customerLogin(req, res, next){
    let email = req.body.email
    let password = req.body.password
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
          res.status(200).json({
            access_token,
            username: data.username
          })
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