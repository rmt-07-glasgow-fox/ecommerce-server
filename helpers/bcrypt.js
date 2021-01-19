const bcrypt = require('bcryptjs')

const hashPassword = (userPasssword) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userPasssword, salt)
    return hash
}

const comparePassword = (userPasssword, dbPassword) => {
    const compari = bcrypt.compareSync(userPasssword, dbPassword)
    return compari
}

module.exports = { hashPassword, comparePassword }