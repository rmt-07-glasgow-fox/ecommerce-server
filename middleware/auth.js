const { User, Product } = require('../models')
const { checkToken } =require('../helper/jwt')

function authenticate(req, res, next){
      let { access_token } = req.headers
      let decoded = checkToken(access_token)

      User.findOne({where: {email: decoded.email}})
            .then(admin => {
                  if(!admin) next(err)
                  req.user = admin
                  next()
            }).catch(err => {
                  next(err)
            })
}

function authorize(req, res, next){
      
      User.findOne({where: {role: 'admin'}})
          .then(user => {
                if(user.role !== req.user.role) res.status(401).json({message: "you have no permission"}) 
                next()
          }).catch(err => {
                res.status(500).json(err)
          })
}

module.exports = { authenticate, authorize }