const bcrypt = require('bcryptjs');

const hashPassword = (inputPassword) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(inputPassword, salt);
  return hash;
};

const checkPassword = (inputPassword, dbPassword) => {
  return bcrypt.compareSync(inputPassword, dbPassword);
};


module.exports = {
  hashPassword,
  checkPassword
};