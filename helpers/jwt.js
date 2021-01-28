const jwt = require('jsonwebtoken')

module.exports = {
    generateToken (payload) {
        return jwt.sign(payload,process.env.SECRET_KEY)
    },
    decode (token) {
        return jwt.verify(token,process.env.SECRET_KEY)
    }
}