const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY)
  return token
}

const checkToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}

module.exports = {
  generateToken,
  checkToken
}