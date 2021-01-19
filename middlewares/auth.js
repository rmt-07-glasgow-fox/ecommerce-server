const { chkToken } = require('../helpers/jwt.js');
const { User } = require('../models/index.js');

let authenticate = async (req, res, next) => {
  try {
    const decode = chkToken(req.headers.access_token);

    if (!decode) throw { name: 'unauthenticate' };

    const user = await User.findOne({ where: { email: decode.email } });

    if (!user) throw { name: 'unauthenticate' };

    req.user = user;
    return next();
  } catch (err) {
    next(err);
  };
};

let authorize = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id, role: 'admin' } })

    if (!user) throw { name: 'unauthorize' };

    return next();
  } catch (err) {
    next(err);
  };
};

module.exports = { authenticate, authorize };