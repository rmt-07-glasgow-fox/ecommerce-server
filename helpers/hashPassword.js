const bcrypt = require("bcryptjs")

function hashPassword(userPassword) {
    const salt = bcrypt.genSaltSync(10)
    const hashed = bcrypt.hashSync(userPassword, salt)
    return hashed
}

function compare(userPassword, dataPassword) {
    return bcrypt.compareSync(userPassword, dataPassword)
}

module.exports = {
    hashPassword,
    compare
}