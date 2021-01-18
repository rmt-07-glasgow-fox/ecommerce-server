const bcrypt = require('bcryptjs');

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(6);
  let hash = bcrypt.hashSync(password, salt);
  return hash
}

function checkPassword(password, dbPassword) {
  let isValid = bcrypt.compareSync(password, dbPassword);
  return isValid
}

// const { hashPassword, checkPassword} = require
module.exports = { hashPassword, checkPassword} 