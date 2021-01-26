const bcrypt = require('bcrypt')

function checkPassword(pass, dbPass){
    return bcrypt.compareSync(pass, dbPass)
}

module.exports = checkPassword