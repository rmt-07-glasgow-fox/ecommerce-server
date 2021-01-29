const { User } = require('../models/index.js');
const { compPass } = require('../helpers/bcrypt.js');
const { genToken, chkToken } = require('../helpers/jwt.js');

const { OAuth2Client } = require('google-auth-library');

class UserController {
  static async register (req, res, next) {
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

  static async loginadmin (req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: 'invalidLogin' };

      const loginadmin = await User.findOne({ where: { email } });

      if (!loginadmin) throw { name: 'invalidLogin' };

      if (loginadmin.role !== 'admin') throw { name: 'unauthorizeAdmin' };

      const chkPass = compPass(password, loginadmin.password);

      if (!chkPass) throw { name: 'invalidLogin' };

      const payload = {
        id: loginadmin.id,
        firstname: loginadmin.firstname,
        lastname: loginadmin.lastname,
        profpic: loginadmin.profpic,
        email: loginadmin.email,
        role: loginadmin.role
      };
      const access_token = genToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    };
  };

  static async login (req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: 'invalidLogin' };

      const login = await User.findOne({ where: { email } });

      if (!login) throw { name: 'invalidLogin' };

      if (login.role === 'admin') throw { name: 'isAdmin' };

      const chkPass = compPass(password, login.password);

      if (!chkPass) throw { name: 'invalidLogin' };

      const payload = {
        id: login.id,
        firstname: login.firstname,
        lastname: login.lastname,
        profpic: login.profpic,
        email: login.email,
        role: login.role,
      };
      const access_token = genToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    };
  };

  static async getuser (req, res, next) {
    try {
      const decode = chkToken(req.headers.access_token);
      const getuser = await User.findOne({ where: { id: decode.id } });

      if (!getuser) throw { name: 'notFound' };

      return res.status(200).json({
        id: getuser.id,
        firstname: getuser.firstname,
        lastname: getuser.lastname,
        email: getuser.email,
        profpic: getuser.profpic,
        role: getuser.role
      });
    } catch (err) {
      next(err);
    };
  };

  static gLogin (req, res, next) {
    const id_token = req.headers.id_token;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let firstname, lastname, email, profpic;

    client.verifyIdToken({ idToken: id_token, audience: process.env.GOOGLE_CLIENT_ID })
      .then(ticket => {
        const payload = ticket.getPayload();
        firstname = payload.given_name;
        lastname = payload.family_name;
        email = payload.email;
        profpic = payload.picture;

        return User.findOne({ where: { email } });
      })
      .then(user => {
        if (!user) {
          return User.create({
            firstname,
            lastname,
            email,
            profpic,
            password: Math.floor(Math.random() * 999999) + "pass"
          });
        } else {
          return user;
        };
      })
      .then(user => {
        const payload = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          profpic: user.profpic
        };
        const access_token = genToken(payload);

        return res.status(200).json({ access_token });
      })
      .catch(err => console.log(err));
  };
};

module.exports = UserController;