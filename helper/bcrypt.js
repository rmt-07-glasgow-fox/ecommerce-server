const bcrypt = require('bcryptjs')

const hashPassword = (input) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(input, salt)
  return hash
}

const comparePassword = (inputPassword, dbPassword) => {
  return bcrypt.compareSync(inputPassword, dbPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}
