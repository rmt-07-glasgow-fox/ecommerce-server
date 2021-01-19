const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
  try {
    const decoded = verifyToken(req.headers.access_token)
    const user = await User.findOne({
      where: {email: decoded.email}
    })
    if (!user) {
      next({name: 'accessDenied'})
    }
    req.user = { id: user.id, email: user.email, role: user.role }
    next()
  } catch (err) {
    next(err)
  }

} 

async function authorization(req, res, next) {
  if (req.user.role === 'admin') {
    next()
  } else {
    next({ name: 'accessDenied' })
  }
}

module.exports = { authentication, authorization }