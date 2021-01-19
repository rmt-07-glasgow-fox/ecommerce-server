const { decodingToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
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
      next()
    }
  } catch(error) {
    next(error)
  }
}

const authorization = async (req, res, next) => {
  try {
    let admin = await User.findByPk(req.currentUser.id)

    if (admin.role != 'admin') {
      next({name: 'notAuthorize'})
    } else {
      next()
    }
  } catch(error) {
    next(error)
  }
}

module.exports = { authentication, authorization }