const bcryptjs = require("bcryptjs")

const hashPass = (input) => {
  const salt = bcryptjs.genSaltSync(10)
  return bcryptjs.hashSync(input, salt)
}

const comparePass = (input, hashedPass) => {
  return bcryptjs.compareSync(input, hashedPass)
}

module.exports = {
  hashPass,
  comparePass
}