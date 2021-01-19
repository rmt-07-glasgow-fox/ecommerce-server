require('dotenv').config()
const bcrypt = require('bcryptjs')
const saltSecret = process.env.SALT_SECRET

exports.generateHash = (password) => {
  const salt = bcrypt.genSaltSync(5)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

exports.compareHash = (password, hPassword) => {
  return bcrypt.compareSync(password, hPassword)
}