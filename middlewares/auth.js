const { checkToken } = require('../helper/jwt')
const { User, Cart } = require('../models')

const authenticate = async (req, res, next) => {
  try {
    let decoded = checkToken(req.headers.access_token)
    let find = await User.findOne({ where: { email: decoded.email}})
    if (!find) {
      return res.status(401).json({ message: 'Please Login First' })
    }
    req.user = find
    next()
  } catch (err) {
    return res.status(400).json({message: err.message})
  }
}

const authorization = async (req, res, next) => {
  const id = req.user.id
  const cartId = +req.params.id
  try {
    const cart = await Cart.findOne({ where: { id: cartId }})
    if (cart.UserId !== id) {
      return res.status(401).json({ message: 'This Product Cart not belongs to you'})
    }
    next()
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error"})
  }
}

module.exports = {
  authenticate,
  authorization
}