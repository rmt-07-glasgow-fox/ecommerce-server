const jwt = require('jsonwebtoken');
SECRET_KEY = process.env.SECRET_KEY

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY);
}

function checkToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

module.exports = {generateToken, checkToken}