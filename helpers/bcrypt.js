const bcrypt = require('bcryptjs');

const hashPass = password => bcrypt.hashSync(password, 5);
const checkPass = (password, hashed) => bcrypt.compareSync(password, hashed);

module.exports = { hashPass, checkPass };