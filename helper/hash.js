const bcrypt = require("bcryptjs")

function hashPassword(params) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(params, salt)
    return hash
}

function comparePass(passwordLogin, passwordDb) {
    return bcrypt.compareSync(passwordLogin, passwordDb)
}

module.exports = {hashPassword, comparePass}