const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

function getToken (payload) {
  return jwt.sign(payload, JWT_KEY);
}

function getPayload (token) {
  return jwt.verify(token, JWT_KEY);
}

module.exports = {
  getToken,
  getPayload
};