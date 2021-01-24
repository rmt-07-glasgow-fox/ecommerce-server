require("dotenv").config();
const bcrypt = require("bcryptjs");
const saltSecret = +process.env.SALT_SECRET;

exports.generateHash = (password) => {
  const salt = bcrypt.genSaltSync(saltSecret);
  return bcrypt.hashSync(password, salt);
};

exports.compareHash = (password, hPassword) => {
  return bcrypt.compareSync(password, hPassword);
};
