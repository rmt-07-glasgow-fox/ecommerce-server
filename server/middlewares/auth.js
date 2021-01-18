const { User } = require('../models')
const { verifyToken } = require('../helpers')

function authenticate(req, res, next){
  try {
    // console.log(req.body);
    // console.log(req.headers.access_token);
    let decode = verifyToken(req.headers.access_token)
    // console.log(decode);
    User.findByPk(decode.id)
    .then(data => {
      if(data){
        // console.log(data);
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