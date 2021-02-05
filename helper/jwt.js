const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

function generateToken(payload) {
    const token = jwt.sign(payload, secret)
    return token
}

function checkToken(token) {
    return jwt.verify(token, secret)
}

module.exports = { 
    generateToken,
    checkToken
}