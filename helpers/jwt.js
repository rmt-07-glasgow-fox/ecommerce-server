const jwt = require('jsonwebtoken')
const SECRET_KEY = 'qwe123'

function genToken(payload) {
    return jwt.sign(payload, SECRET_KEY)
}

function checkToken(token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    genToken,
    checkToken
}