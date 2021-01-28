const bcrypt = require('bcrypt')
const saltRound = 10

function hashPassword (password) {
  let salt = bcrypt.genSaltSync(saltRound)
  let hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword
}

function comparePassword (password, hashedPassword) {
  let compareResult = bcrypt.compareSync(password, hashedPassword)
  return compareResult
}

module.exports = { hashPassword, comparePassword };