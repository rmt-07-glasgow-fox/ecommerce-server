const {verifyToken} = require('../helpers/jwt')

exports.authentificate = (req, res, next) => {
  try {
    if (req.headers.access_token) {
      const user = verifyToken(req.headers.access_token)
      if (user) {
        req.user = user
        next()
      } else {
        throw {
          code: 403,
          message: 'User Invalid'
        }
      }
    } else {
      throw {
        code: 400, 
        message: 'Login first'
      }
    }
  } catch (error) {
    next(error)
  }
}