const { Admin } = require('../models')
const { tokenGenerate } = require('../helper/jwt')

class UserController {
      static login(req, res, next) {
            let { email, password } = req.body

            Admin.findOne({where: {email}})
                .then(admin => {
                      if(!admin) next(err)
                      if(admin.password !== password) next(err)
                      let payload = {
                            id: admin.id,
                            email: admin.email
                      }

                      let access_token = tokenGenerate(payload)
                      res.status(200).json({ access_token })
                }).catch(err => {
                      next(err)
                })

            
      }
}

module.exports = UserController