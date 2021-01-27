const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({ name: 'LoginValidation' });
  }

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return next({ name: 'NotFound', attr: 'User' });
    }

    if (user.role !== 'admin') {
      return next({ name: 'NotAdmin' });
    }

    const isPassword = comparePassword(password, user.password);

    if (isPassword) {
      const payload = { userId: user.id, userEmail: user.email };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return res.status(200).json({
        access_token: token,
      });
    } else {
      return next({ name: 'LoginFailed' });
    }
  } catch (err) {
    return next(err);
  }
};

exports.register = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return next({ name: 'RegisterValidation' });
  }
  const body = {
    firstname,
    lastname,
    email,
    password,
  };

  try {
    const user = await User.create(body);

    const data = {
      id: user.id,
      email: user.email,
    };

    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};
