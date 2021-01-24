require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || 'SECRET';

exports.generateToken = (user) => {
  return jwt.sign(user, jwtSecret);
};

exports.verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};
