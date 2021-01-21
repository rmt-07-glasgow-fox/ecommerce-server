require("dotenv").config();
const { User } = require("../models");
const { compareHash } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
// const {OAuth2Client} = require('')
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.login = async (req, res, next) => {
  try {
    !req.body.email.length && !req.body.password.length
      ? next({ name: "EmailPasswordIsEmpty" })
      : req;
    !req.body.email.length ? next({ name: "EmailIsEmpty" }) : req;
    !req.body.password.length ? next({ name: "PasswordIsEmpty" }) : req;

    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await User.findOne({ where: { email: data.email } });
    if (user) {
      if (compareHash(data.password, user.password)) {
        const access_token = generateToken({
          id: user.id,
          email: user.email,
          role: user.role,
        });
        res.status(200).json({ access_token });
      } else {
        next({ name: "WrongPassword" });
      }
    } else {
      next({ name: "EmailDoesNotExist" });
    }
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      role: "customer",
    };
    const user = await User.create(data);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
