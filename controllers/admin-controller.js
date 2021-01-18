const { Admin } = require('../models')
const { tokenGenerate } = require('../helper/jwt')

class AdminController {
      static login(req, res, next) {
            let { email, password } = req.body

            Admin.findOne({where: {email}})
                .then(admin => {
                      if(!admin) res.status(400).json(err)
                      if(admin.password !== password) res.status(400).json(err)
                      let payload = {
                            id: admin.id,
                            email: admin.email
                      }

                      let access_token = tokenGenerate(payload)
                      res.status(200).json({ access_token })
                }).catch(err => {
                  res.status(500).json(err)
                })

            
      }
}

module.exports = AdminController