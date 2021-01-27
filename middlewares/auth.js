const { checkToken } = require ('../helpers/jwt')
const { User, Product, Cart } = require ('../models/index')

async function authenticateAdmin (req, res, next) {
  try {
    let decoded = checkToken (req.headers.access_token)

    let data = await User.findOne ({
      where: {
        email: decoded.email
      }
    })
    if (!data) {
      res.status (403).json ({message: 'Please login first'})
    } else if (data.role !== 'admin') {
      next ({name: 'Unauthorized access'})
    } else {
      req.user = data.id
      next ()
    }
  } catch (err) {
    next (err)
  }
}

async function authenticate (req, res, next) {
  try {
    let decoded = checkToken (req.headers.access_token)

    let data = await User.findOne ({
      where: {
        email: decoded.email
      }
    })
    if (!data) {
      res.status (403).json ({message: 'Please login first'})
    } else {
      req.user = data.id
      next ()
    }
  } catch (err) {
    next (err)
  }
}

async function authorize (req, res, next) {
  try {
    const targetId = +req.params.cartId
    var data = await Cart.findOne({
      where: {
        id: targetId
      }
    })
    if (data.userId !== req.user) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (data.userId === req.user) {
      next()
    }
  } catch (err) {
    console.log(data, 'masuk')
    next (err)
  }
}

module.exports = {
  authenticateAdmin,
  authenticate,
  authorize
}