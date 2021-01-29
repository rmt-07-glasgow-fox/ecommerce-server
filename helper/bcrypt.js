const bcrypt = require('bcryptjs')

function hashing(password){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)
    return hash
}

function compare(password,hash) {
    const compare = bcrypt.compareSync(password,hash)
    return compare
}

module.exports = {hashing,compare}