const bcrypt = require("bcryptjs")

function hashPassword(plainPassword) {
  const salt = bcrypt.genSaltSync(13)
  return bcrypt.hashSync(plainPassword, salt)
}

function comparePassword(plainPassword, hashedPasword) {
  return bcrypt.compareSync(plainPassword, hashedPasword)
}

module.exports = {
  hashPassword,
  comparePassword,
}
