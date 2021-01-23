const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
    generateToken(payload) {
        return jwt.sign(payload, JWT_SECRET_KEY)
    },
    verifyToken(token) {
        return jwt.verify(token, JWT_SECRET_KEY)
    }
}  