const { checkToken } = require('../helpers/jwt')
const { User, Product } = require('../models')

class Auth {
  static authentication(req, res, next) {
    try {
      const { access_token } = req.headers
      if (access_token) {
        let payload = checkToken(access_token)
        User.findByPk(payload.id)
          .then(user => {
            !user ? res.status(404).json({ message: 'User Not Found!' }) :
            req.UserData = payload, next()
          })
          .catch(err => {
            res.status(500).json({ message: 'Internal Server Error' })
          })
      }
      else {
        res.status(401).json({ message: 'Please login first!' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  static authorizationAdmin(req, res, next) {
    const role = req.UserData.role
    role !== 'admin' ? res.status(403).json({ message: 'You dont have access!' }) ://forbidden 
    next()
  }
}

module.exports = Auth