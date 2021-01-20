const jwt = require("jsonwebtoken");
SECRET_KEY = process.env.JWT_KEY;

function generateJwt(payload) {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}

function verifyJwt(token) {
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded;
}

module.exports = { generateJwt, verifyJwt };
