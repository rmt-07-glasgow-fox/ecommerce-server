const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_KEY)
}

const checkToken = (token) => {
  return jwt.verify(token, JWT_KEY)
}

module.exports = { generateToken, checkToken }