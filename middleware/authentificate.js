const {verifyToken} = require('../helpers/jwt')

exports.authentificate = (req, res, next) => {
  try {
    if (req.headers.access_token) {
      const user = verifyToken(req.headers.access_token)
      if (user) {
        req.user = user
        next()
      } else {
        next({name: "Unauthorized"})
      }
    } else {
      next({name: "Authentificate"})
    }
  } catch (error) {
    next(error)
  }
}