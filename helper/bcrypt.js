const bcrypt = require('bcryptjs')

function hashPassword(password) {
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(password, salt)
}

function comparePassword(loginPassword, hashedPassword) {
      return bcrypt.compareSync(loginPassword, hashedPassword)
}

module.exports = { hashPassword, comparePassword }