const { genToken } = require('../../helper/jwt')

function loginTest(payload) {

    
    let access_token = genToken(payload) 

    return access_token
}


module.exports = loginTest 