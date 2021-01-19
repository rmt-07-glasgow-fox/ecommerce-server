const bcryptjs = require('bcryptjs')

const hashingPassword = (password) => {
  const salt = bcryptjs.genSaltSync(5)
  return bcryptjs.hashSync(password, salt)
}

const comparePassword = (passwordParams, passwordDb) => {
  return bcryptjs.compareSync(passwordParams, passwordDb)
}

module.exports = { comparePassword, hashingPassword }