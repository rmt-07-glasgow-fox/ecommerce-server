const bcrypt = require("bcryptjs");

function hashPassword(userInputPassword) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userInputPassword, salt);
  return hash;
}

function comparePassword(userInputPassword, userDbPassword) {
  const checkPassword = bcrypt.compareSync(userInputPassword, userDbPassword);
  return checkPassword;
}

module.exports = { comparePassword, hashPassword };
