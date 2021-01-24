const { User } = require('../models')
const { checkToken } = require('../helpers/jwt')

const authenticate = async (req, res, next) => {
  let access_token = req.headers.access_token

  if (!access_token) {
    next({ name: 'Unauthenticated' })
  } else {
    try {
      let decoded = checkToken(access_token)

      let user = await User.findOne({
        where: {
          email: decoded.email
        }
      })

      if (user) {
        req.user = user
        next()
      } else {
        next({ name: 'Unauthenticated' })
      }
    } catch (err) {
      next(err)
    }
  }
}

const authAdmin = (req, res, next) => {
  const role = req.user.role

  if (role === 'admin') {
    next()
  } else {
    next({ name: 'Unauthorized' })
  }
}

module.exports = {
  authenticate,
  authAdmin
}
