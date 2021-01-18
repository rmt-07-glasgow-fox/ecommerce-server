const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class UserController {
  static register(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }

    User.create(payload)
      .then(user => {
        res.status(201).json({ id: user.id, email: user.email})
      }).catch(err => {
        if(err.errors[0].validatorName === 'len') {
          next({ name: 'len'})
        } else if(err.errors[0].validatorName === 'isEmail') {
          next({ name: 'isEmail'})
        } else if(err.errors[0].validatorName === 'notEmpty') {
          next({ name: 'roleNotEmpty'})
        } else {
          next(err)
        }
      })
    
  }


  static login(req, res, next) {
    const { email, password } = req.body

    User.findOne({where: { email }})
      .then(user =>{
        if(!user) {
          next({name: "invalidEmailOrPassword"})
        }

        const match = comparePassword(password, user.password)

        const payload = {
          id: user.id,
          email: user.email
        }

        const access_token = generateToken(payload)

        match ? res.status(200).json({access_token}) : next({name: "invalidEmailOrPassword"})
      })
      .catch(err => {
        next(err)
      })

  }
}

module.exports = UserController