const {checkToken} = require("../helpers/jwt")
const {User} = require("../models")

function authentication(req, res, next) {
    console.log(req.headers.access_token, "<<<<<<<< ini akses token")
    if (!req.headers.access_token) {
        next({name: "AuthError"})
    } else {
        const authParams = checkToken(req.headers.access_token)
        User.findOne({where: {email: authParams.email}})
        .then(user => {
            if (!user) {
                next({name: "AuthError"})
            } else {
                req.user = user
                next()
            }
        })
        .catch(err => {
            next(err)
        })  
    }

}

function authorization(req, res, next) {
  const authParams = checkToken(req.headers.access_token)
  if (authParams.role !== 'admin') {
    next({name: "AuthError"})
  } else {
    next()
  }
}

module.exports = {authentication, authorization}