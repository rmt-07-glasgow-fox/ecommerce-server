const bcrypt = require('bcryptjs');

function hashPassword (raw) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(raw, salt);

  return hash;
}

function checkPassword (raw, hash) {
  return bcrypt.compareSync(raw, hash);
}

module.exports = {
  hashPassword,
  checkPassword
};