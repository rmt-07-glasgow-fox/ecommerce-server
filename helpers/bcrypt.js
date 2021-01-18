const bcrypt = require('bcryptjs')

const hashPwd = plainPwd => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(plainPwd, salt)
  return hash
}

const comparePwd = (plainPwd, hashedPwd) => {
  const isMatch = bcrypt.compareSync(plainPwd, hashedPwd)
  return isMatch
}

module.exports = { hashPwd, comparePwd }
