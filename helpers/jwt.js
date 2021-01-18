const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const checkToken = (access_token) => {
  return jwt.verify(access_token, SECRET_KEY);
};


module.exports = {
  generateToken,
  checkToken
};