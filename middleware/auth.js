const { verifyToken } = require('../helpers/jwt')
const { User, Product } = require('../models')

async function authenticate (req, res, next) {
  try {
    if (!req.headers.access_token) throw ({name: 401, message: 'Please login first'})
    let access_token = req.headers.access_token
    let payload = await verifyToken(access_token)
    let user = await User.findOne({where: {email: payload.email}})
    if (user) {
      next()
    } else {
      throw ({name: 401, message: 'unauthorized'})
    }
  } catch (err) {
    next(err)
  }
}

async function authorize (req, res, next) {
  try {
    let payload = await verifyToken(req.headers.access_token)
    let user = await User.findOne({where: {id: payload.id}})
    if (user) {
      if (user.role == 'admin') {
        next()
      } else {
        throw ({name: 401, message: 'unauthorized'})
      }
    } else {
      throw ({name: 404, message: 'product not found'})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { authenticate, authorize }