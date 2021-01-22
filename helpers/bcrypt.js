const bcrypt = require('bcrypt')
const saltRounds = process.env.SALT_ROUNDS

function hashPassword(password){
    const salt = bcrypt.genSaltSync(Number(saltRounds));
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function checkPassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashPassword, checkPassword
}