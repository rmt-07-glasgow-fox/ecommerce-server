const { User } = require('../models')

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
        console.log(err)
        if(err.errors[0].validatorName === 'len') {
          next({ name: 'len'})
        } else if(err.errors[0].validatorName === 'isEmail') {
          next({ name: 'isEmail'})
        } else if(err.errors[0].validatorName === 'notEmpty') {
          next({ name: 'roleNotEmpty'})
        } else {
          next(err)
        }
        // console.log(err)
      })
    
  }
}

module.exports = UserController