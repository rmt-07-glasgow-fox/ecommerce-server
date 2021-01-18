const jwt = require('jsonwebtoken')
const env = process.env.SECRET_JWT

function generateToken (input) {
    return jwt.sign(input, env);
}
function verifyJWT (input) {
    return jwt.verify(input, env);
}

module.exports = { generateToken, verifyJWT }