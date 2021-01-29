const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

function generateToken(inputObject) {
    return jwt.sign(inputObject, JWT_SECRET)
}

function readToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    generateToken,
    readToken
}