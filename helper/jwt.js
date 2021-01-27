const jwt = require('jsonwebtoken')

function genToken(decoded) {
    return jwt.sign(decoded, process.env.SECRET_TOKEN)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_TOKEN)
}

module.exports = {
    genToken, verifyToken
}