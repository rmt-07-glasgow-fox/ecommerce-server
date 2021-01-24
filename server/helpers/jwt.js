const jwt = require ("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

function getToken (payload) {
    const token = jwt.sign(payload, SECRET_KEY)
    return token
}

function checkToken (token) {
    const verify = jwt.verify(token, SECRET_KEY)
    return verify
}

module.exports = {
    getToken,
    checkToken
}