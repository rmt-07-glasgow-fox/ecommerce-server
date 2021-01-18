const bcrypt = require('bcryptjs')

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(5)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

function checkPassword(password, dbPassword) {
  const check = bcrypt.compareSync(password, dbPassword)

  return check
}

module.exports = {
  hashPassword,
  checkPassword
}