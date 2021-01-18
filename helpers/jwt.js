const jwt = require("jsonwebtoken")

function makeToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY)
    return token
}

function validToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = {
    makeToken,
    validToken
}