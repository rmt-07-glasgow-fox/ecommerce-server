const jwt = require('jsonwebtoken')
SECRET_KEY = process.env.SECRET_KEY

function generateToken (payload) {
let token = jwt.sign(payload, SECRET_KEY)
return token
}

function verifyToken (token) {
  let payload = jwt.verify(token, SECRET_KEY)
  return payload
}

module.exports = { generateToken, verifyToken }