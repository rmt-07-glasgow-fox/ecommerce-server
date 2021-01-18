const jwt = require('jsonwebtoken')
const secretKey = process.env.secretKey

function genToken(payload){
    let token = jwt.sign(payload, secretKey)
    return token
}

function cekToken(token){
    return jwt.verify(token, secretKey)
}

module.exports ={
    genToken,
    cekToken
}