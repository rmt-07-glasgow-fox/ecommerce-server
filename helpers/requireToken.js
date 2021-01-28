const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.includes('Bearer ')) {
    return next({ name: 'Auth' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return next({ name: 'Auth' });
    }

    const { userId } = payload;

    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password'] },
    });
    req.user = user;
    next();
  });
};
