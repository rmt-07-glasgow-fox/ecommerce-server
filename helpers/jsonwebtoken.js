const jwt = require('jsonwebtoken')
const SECRET_KEY = "belajarTDD"

function generateToken(payload){
    const token = jwt.sign(payload, SECRET_KEY)
    return token
}

function validateToken(token){
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    generateToken, validateToken
}