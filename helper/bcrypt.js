const bcrypt = require('bcryptjs')

function hashPassword(userPassword) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userPassword, salt)
    return hash
}

function comparePassword(userPassword, dbPassword) {
    // console.log('comparing password .....');
    return bcrypt.compareSync(userPassword, dbPassword)
}

module.exports = { 
    hashPassword,
    comparePassword 
} 