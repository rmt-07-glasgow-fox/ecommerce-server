const { User, Product, Cart } = require('../models')
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
      let { access_token } = req.headers
      let decoded = checkToken(access_token)
  if (req.user.role !== 'admin') res.status(401).json({message: 'you are not admin'})
  next()
}

function authorizeCustomer(req, res, next){

      if (req.user.role !== 'customer') res.status(401).json({message: 'invalid email/password'})
      next()
}

module.exports = { authenticate, authorize, authorizeCustomer }