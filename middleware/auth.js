const { Admin, Product } = require('../models')
const { checkToken } =require('../middleware/jwt')

function authenticate(req, res, next){
      let { access_token } = req.headers
      let decoded = checkToken(access_token)

      Admin.findOne({where: {email: decoded.email}})
            .then(admin => {
                  if(!admin) next(err)
                  req.user = admin
                  next()
            }).catch(err => {
                  next(err)
            })
}