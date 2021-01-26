const { User } = require('../models');
const decodeToken = require('../helpers/decodeToken');

const isLoginCustomer = async(req, res, next) => {
  try {
    const { access_token } = req.headers;
    const decoded = decodeToken(access_token);

    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) return next({ name: 'authValidate' });
    if (user.role !== 'customer') return next({ name: 'unauthorize' });

    req.user = decoded;

    next()
  } catch (error) {
    return next(error);
  }
}

module.exports = isLoginCustomer