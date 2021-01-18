const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const generateToken = payload => {
  const token = jwt.sign(payload, SECRET_KEY)
  return token
}

const verifyToken = token => {
  const isMatch = jwt.verify(token, SECRET_KEY)
  return isMatch
}

module.exports = { generateToken, verifyToken }