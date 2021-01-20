const bcrypt = require('bcryptjs')

function hashPassword(payload){
    const salt = bcrypt.genSaltSync(9)
    const hash = bcrypt.hashSync(payload, salt)

    return hash
}

function comparePassword(password ,hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}


module.exports = {
    hashPassword,
    comparePassword
}