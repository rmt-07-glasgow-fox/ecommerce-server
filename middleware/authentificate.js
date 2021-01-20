const {verifyToken} = require('../helpers/jwt')

exports.authentificate = (req, res, next) => {
  try {
    if (req.headers.access_token) {
      const user = verifyToken(req.headers.access_token)
      if (user) {
        req.user = user
        next()
      } else {
        res.status(403).json({errors:['User Invalid']})
      }
    } else {
      res.status(400).json({errors:['Login first']})
    }
  } catch (error) {
    next(error)
  }
}