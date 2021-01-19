const { User } = require('../models')
const { checkToken } = require('../helpers/jwt')

function authenticate(req, res, next) {
  try {
    let decoded = checkToken(req.headers.access_token)
    User.findOne({
      where: { email: decoded.email }
    })
    .then(data => {
      if(!data) {
        next({ name: 'needLogin' })
      } else {
        req.user = data
        next()
      }
    })
    .catch(err => {
      next(err)
    })
  }
  catch(err) {
    next({ name: 'needLogin'})
  }
}

function authorize(req, res, next){
  User.findOne({
    where: { id: req.user.id, role: 'admin' }
  })
  .then(data => {
    if(!data) {
      next({ name: 'needAccess' })
    } else {
      next()
    }
  })
  .catch(err => {
    next(err)
  })
}

module.exports = {
  authenticate,
  authorize
}