const { User } = require('../models')
const { verifyJWT } = require('../helper/jwt')

async function authenticate (req, res, next) {
  try {
    console.log(req.url)
    const decode = verifyJWT(req.headers.access_token)
    const data = await User.findOne({
      where: { email: decode.email}
    })
    if (!decode) {
      return next({
        name: 'access_token'
      })
    } else { 
      req.user = data
      next()
    }
  } catch (err) {
    next(err)
    console.log(err)
  }
}
async function authorization (req, res, next) {
  try {
    if (req.user.role.toLowerCase() === 'admin') next()
    else {
      return next({ 
        name: 'customer'
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { authenticate, authorization }