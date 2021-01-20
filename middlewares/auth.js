const { decodingToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  if (!req.headers.access_token) {
    return next({name: 'jwtError'})
  }
  try {
    let decoded = decodingToken(req.headers.access_token)
    let user = await User.findOne({where: {email: decoded.email}})

    if (!user) {
      next({name: 'notValid'})
    } else {
      let currentUser = {
        id: user.id,
        email: user.email,
        username: user.username
      }

      req.currentUser = currentUser
      // console.log('TRY OTENTIKASI', currentUser);
      next()
    }
  } catch(error) {
    // console.log('CATCH OTENTIKASI', error);
    // next({})
    if (error.name == 'SequelizeVlidationError') {
      next(error)
    } else {
      next({name: 'notAuthorize'})
    }
  }
}

const authorization = async (req, res, next) => {
  try {
    let admin = await User.findByPk(req.currentUser.id)

    if (admin.role != 'admin') {
      // console.log('BUKAN ADMIN', currentUser);
      next({name: 'notAuthorize'})
    } else {
      // console.log('IS ADMIN');
      next()
    }
  } catch(error) {
    // console.log('CATCH OTORISASI', error);
    next(error)
  }
}

module.exports = { authentication, authorization }