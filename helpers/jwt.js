const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

let genToken = payload => jwt.sign(payload, SECRET_KEY);

let chkToken = token => jwt.verify(token, SECRET_KEY);

module.exports = { genToken, chkToken };