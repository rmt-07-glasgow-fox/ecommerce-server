const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt');

class UserController {
  static login(req,res,next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if(!user) {
        throw {
          status: 401,
          msg: "invalid email or password"
        }
      } else if (comparePassword(req.body.password, user.password)) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({access_token})
      } else {
        throw {
          status: 401,
          msg: "invalid email or password"
        }
      }
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
  }
}

module.exports = UserController