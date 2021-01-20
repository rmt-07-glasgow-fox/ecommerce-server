const { User } = require('../models');
const { checkPassword } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class UserController {
  
  static async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const newUser = { email, password, role };
      await User.create(newUser);
      return res.status(201).json({ message: 'Success create user' });
    }
    catch (err) {
      console.log(err);
      return next(err);
    }    
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if(!email) {
        return next({ name: 'Email is required' });
      }
      else if (!password) {
        return next({ name: 'Password is required' });
      }
      else {
        const userFound = await User.findOne({ where: { email } });
        if(!userFound) return next({ name: 'Invalid email/password' });
        const match = checkPassword(password, userFound.password);
        if(!match) return next({ name: 'Invalid email/password' });
        const payload = {
          id: userFound.id,
          email: userFound.email
        }
        const access_token = generateToken(payload);
        return res.status(200).json({ access_token });
      }
    } 
    catch (err) {
      return next(err);
    }
  }
}

module.exports = UserController;