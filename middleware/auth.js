const { User } = require('../models')
const { verifyJWT } = require('../helper/jwt')

async function authenticate (req, res, next) {
  try {
    // console.log(req.headers, 'headers =====')
    console.log(req.url)
    const decode = verifyJWT(req.headers.access_token)
    // console.log(decode, 'decode =====')
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
    // console.log(req.user.role);
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
// async function customerAuthorization (req, res, next) {
//   try {
//     const find = await Cart.findOne({
//       where: { UserId: req.user.id}
//     })
//     console.log(req.user)
//     console.log(find.UserId)
//     if (find) next()
//     else {
//       res.status(200).json({
//         msg: 'Your not allowed'
//       })
//     }
//   } catch (err) {
//     next(err)
//   }
// }

module.exports = { authenticate, authorization }