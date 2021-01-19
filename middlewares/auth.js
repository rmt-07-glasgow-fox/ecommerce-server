const { checkToken } = require('../helper/jwt')
const { User } = require('../models')

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

module.exports = {
  authenticate
}