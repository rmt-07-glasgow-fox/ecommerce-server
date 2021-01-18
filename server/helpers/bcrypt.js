const bcrypt = require('bcryptjs')

function encrypt(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function decrypt(password, hashed){
    return bcrypt.compareSync(password, hashed)
}

module.exports = {
    encrypt,
    decrypt
}