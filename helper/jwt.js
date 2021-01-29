const jwt = require('jsonwebtoken')

function generateToken(data) {
    const accesstoken = jwt.sign(data,process.env.SECRET_KEY)
    return accesstoken
}

function decodeToken(accesstoken) {
    const decoded = jwt.verify(accesstoken,process.env.SECRET_KEY)
    return decoded
}

module.exports = {generateToken,decodeToken}