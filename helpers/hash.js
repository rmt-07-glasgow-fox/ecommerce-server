const bcrypt = require("bcryptjs")

function hasher(userPassword) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(userPassword, salt)
  return hash
}

function compareHash(userPassword, hashedPassword) {
  return bcrypt.compareSync(userPassword, hashedPassword)
}

module.exports = {hasher, compareHash}