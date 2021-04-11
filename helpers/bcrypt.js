const bcrypt = require('bcryptjs')

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePassword(password,hashed) {
    return bcrypt.compareSync(password, hashed);
}

module.exports = {
    hashPassword,
    comparePassword
}