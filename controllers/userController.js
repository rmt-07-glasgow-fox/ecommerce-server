const { User } = require('../models/index.js');
const { compPass } = require('../helpers/bcrypt.js');
const { genToken, chkToken } = require('../helpers/jwt.js');

class UserController {
  static async register(req, res, next) {
    try {
      const { firstname, lastname, email, password } = req.body;
      const register = await User.create({ firstname, lastname, email, password });

      return res.status(201).json({
        id: register.id,
        firstname: register.firstname,
        lastname: register.lastname,
        email: register.email,
      })
    } catch (err) {
      next(err);
    };
  };

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: 'invalidLogin' };

      const login = await User.findOne({ where: { email } });

      if (!login) throw { name: 'invalidLogin' };

      const chkPass = compPass(password, login.password);

      if (!chkPass) throw { name: 'invalidLogin' };

      const payload = {
        id: login.id,
        firstname: login.firstname,
        lastname: login.lastname,
        profpic: login.profpic,
        email: login.email,
        role: login.role
      };
      const access_token = genToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      // console.log(err)
      next(err);
    };
  };
};

module.exports = UserController;