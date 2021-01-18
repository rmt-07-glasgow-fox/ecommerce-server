const { User } = require('../models')
const { verifyToken } = require('../helpers')

function authenticate(req, res, next){
  try {
    let decode = verifyToken(req.headers.access_token)
    User.findByPk(decode.id)
    .then(data => {
      if(data){
        req.userData = {
          id: data.id,
          email: data.email
        }
        next()
      } else {
        next({status: 401})
      }
    })
    .catch(err => {
      next(err)
    })
  } catch (error) {
    next({
      status: 400,
      message: error.message
    })
  }
}

function authorized(req, res, next){

}

module.exports = {
  authenticate,
  authorized
}