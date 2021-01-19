const bcrypt = require('bcrypt')

function hashPassword (inputPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(inputPassword, salt);
    return hash
}
function checkPass (inputPassword, input) {
    return bcrypt.compareSync(inputPassword, input)
}

module.exports = { hashPassword, checkPass }