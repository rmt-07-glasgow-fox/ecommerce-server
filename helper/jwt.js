
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'rahasia'


function tokenGenerate(payload){
     return jwt.sign(payload, SECRET_KEY)
}

function checkToken(token){
      return jwt.verify(token, SECRET_KEY)
}


module.exports = { tokenGenerate, checkToken }