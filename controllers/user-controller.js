const { User, Cart } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { tokenGenerate } = require('../helper/jwt')

class UserController {
      static login(req, res, next) {
            let { email, password } = req.body
            console.log(req.body);
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
                }).catch(err => {
                      console.log(err);
                })
      }

      static register(req, res, next){
            let newUser = {
                  email: req.body.email,
                  password: req.body.password,
            }

            User.create(newUser)
               .then(data => {
                     return Cart.create({ UserId: data.id })
               }).then(cart => {
                     res.status(201).json(cart)
               }).catch(err => {
                  //    res.status(400).json(err)
                  console.log(err);
               })
      }

}

module.exports = UserController