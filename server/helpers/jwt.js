const jwt = require("jsonwebtoken")

function generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
    return token
}

function tokenCheck(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = { generateToken, tokenCheck }