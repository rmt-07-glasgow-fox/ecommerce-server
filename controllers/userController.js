const { User } = require("../models")
const { comparePass } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")


class UserController {
  static register (req, res, next) {
    let data = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      role: req.body.role,
    }
    User.create(data)
      .then(data => {
        let payload = {
          id: data.id,
          email: data.email,
          name: data.name
        }
        let access_token = generateToken(payload)
        res.status(201).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }

  static loginUser (req, res, next) {
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
        if (data.role !== "customer") {
          return next({ 
            name: "Unauthorized" 
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

  static loginAdmin (req, res, next) {
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
        if (data.role !== "admin") {
          return next({ 
            name: "Unauthorized" 
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
