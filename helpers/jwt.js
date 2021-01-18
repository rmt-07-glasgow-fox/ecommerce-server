import jwt from 'jsonwebtoken';
import SECRET_KEY from process.env.SECRET_KEY;

let genToken = payload => jwt.sign(payload, SECRET_KEY);

let chkToken = token => jwt.verify(token, SECRET_KEY);

module.exports = { genToken, chkToken };