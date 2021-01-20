const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt.js");
const { generateJwt } = require("../helpers/jwt.js");

class UserController {
  static login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((dataUser) => {
        if (!dataUser) {
          throw { name: "invalidEmailPassword" };
        }
        const checkPassword = comparePassword(password, dataUser.password);
        if (!checkPassword) {
          throw { name: "invalidEmailPassword" };
        }
        const payload = {
          id: dataUser.id,
          email: dataUser.email,
          role: dataUser.role,
        };
        const access_token = generateJwt(payload);
        return res.status(200).json({ access_token });
      })
      .catch((err) => {
        return next(err);
      });
  }

  static register(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    User.create(payload)
      .then((user) => {
        res.status(201).json({
          id: user.id,
          email: user.email,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
