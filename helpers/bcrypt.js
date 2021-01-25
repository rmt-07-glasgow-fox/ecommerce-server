const bcrypt = require('bcryptjs')

function hashPass(password){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)
    return hash
}

function comparePass(password, hash){
    return bcrypt.compareSync(password,hash)
}

module.exports = {
    hashPass,
    comparePass
}