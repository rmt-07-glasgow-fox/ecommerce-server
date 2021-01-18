const bcrypt = require('bcryptjs')

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10)

    return bcrypt.hashSync(password, salt)
}

function isPasswordValid(inputPassword, dbPassword) {
    return bcrypt.compareSync(inputPassword, dbPassword)
}

module.exports = {
    hashPassword,
    isPasswordValid
}