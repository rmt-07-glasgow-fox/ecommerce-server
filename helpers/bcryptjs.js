const bcrypt = require('bcryptjs');

function hashPassword(pass) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
}

function comparePassword(password, hasshedPass) {
    return bcrypt.compareSync(password, hasshedPass)
}

module.exports = {
    hashPassword,
    comparePassword
}