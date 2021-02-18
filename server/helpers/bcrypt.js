const bcrypt = require('bcryptjs')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function comparePassword(password, checkPassword) {
    return bcrypt.compareSync(password, checkPassword); // true
}

module.exports = { hashPassword, comparePassword }