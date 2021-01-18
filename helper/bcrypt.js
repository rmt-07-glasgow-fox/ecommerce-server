const bcrypt = require('bcrypt')

function hashPassword (inputPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(inputPassword, salt);
    return hash
}
function checkPass (inputPassword) {
    return bcrypt.compareSync(inputPassword, hash)
}

module.exports = { hashPassword, checkPass }