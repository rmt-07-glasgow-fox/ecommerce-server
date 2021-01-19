const { cekToken } = require('../helpers/jwt')
const { User, Product, Banner } = require('../models')

const authenticate = async (req,res,next) => {
  try {
    const token = req.headers.access_token
    if(!token) next({name: 'ErrorAccessToken'})
    const decode = cekToken(token)
    const user = await User.findOne({
      where: {email : decode.email}
    })
    if(user){
      req.user = decode
      next()
    } else {
      next({name: 'ErrorAuthenticate'})
    }
  } catch (err) {
    next(err)
  }
}

const authorize = async (req,res,next) => {
  try {
    const {role, email} = req.user
    const user = await User.findOne({
      where: {email}
    })
    if(user){
      if(role === 'admin'){
        next()
      }else{
        next({name: 'ErrorAuthorize'})
      }
    }else{
      next({name: 'ErrorNotFound'})
    }
  } catch (err) {
    next(err)
  }
}

const authorizeProduct = async (req,res,next) => {
  try {
    const { id } = req.params
    const role = req.user.role
    const product = await Product.findOne({
      where: {id}
    })
    if(product){
      if(role === "admin"){
        next()
      }else{
        next({name: 'ErrorAuthorize'})
      }
    }else{
      next({name: 'ErrorNotFound'})
    }
  } catch (err) {
    next(err)
  }
}

const authorizeBanner = async (req,res,next) => {
  try {
    const { id } = req.params
    const role = req.user.role
    const banner = await Banner.findOne({
      where: {id}
    })
    if(banner){
      if(role === "admin"){
        next()
      }else{
        next({name: 'ErrorAuthorize'})
      }
    }else{
      next({name: 'ErrorNotFound'})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticate,
  authorize,
  authorizeProduct,
  authorizeBanner
}