const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { tokenGenerate } = require('../helper/jwt')

class UserController {
      static login(req, res, next) {
            let { email, password } = req.body

            User.findOne({where: {email}})
                .then(user => {
                      if(!user) res.status(401).json({message: "invalid email/password"})
                      let match = comparePassword(password, user.password)
                      console.log(user.password);
                      if(!match) res.status(401).json({message: "invalid email/password"})
                      let payload = {
                            id: user.id,
                            email: user.email
                      }

                      let access_token = tokenGenerate(payload)
                      res.status(200).json({ access_token })
                }).catch(next)
      }

}

module.exports = UserController