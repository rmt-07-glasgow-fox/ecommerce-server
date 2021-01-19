const bcrypt = require('bcrypt')

class HelperBcrypt {
    static hashPassword(password) {
        const passwordHash = bcrypt.hashSync(password, 8)
        return passwordHash
    }

    static comparePassword(password, passwordHash){
        return bcrypt.compareSync(password, passwordHash)
    }
}

module.exports = HelperBcrypt