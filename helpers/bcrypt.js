const bcrypt = require('bcryptjs')

function comparePass(plainPass, hash) {
    const isValidPass = bcrypt.compareSync(plainPass, hash)
    return isValidPass
}

module.exports = {comparePass}