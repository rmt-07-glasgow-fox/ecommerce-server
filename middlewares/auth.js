const { verifyToken } = require('../helpers/jwt')
const { User, Product } = require('../models')

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

// async function authorization(req, res, next) {
//   try {
//     const product = await Product.findOne({ where: { id: +req.params.id }})
//     if (!product) {
//       next({ name: 'resourceNotFound' })
//     } else if ( user.UserId !== req.user.id ) {
//       next({ name: 'accessDenied' })
//     } else {
//       next()
//     }
//   } catch (err) {
//     next(err)
//   }
// }

module.exports = { authentication }