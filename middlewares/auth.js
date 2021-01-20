const { User, Product } = require('../models')
const { verifyToken } = require('../helpers/jwtHelper')

const authentication = (req, res, next) => {
  try {
    if(req.headers.access_token){
      let decryptedData = verifyToken(req.headers.access_token)
      if(decryptedData.role === 'admin'){
        User.findOne({
          where:{
            email: decryptedData.email
          }
        })
          .then(data => {
            req.userData = data
            next()
          })
          .catch(err => {
            next({
              name: 'WrongEmail'
            })
          })
      }else{
        next({
          name: 'NotAdmin'
        })
      }
    }else{
      next({
        name: 'Forbidden'
      })
    }
  } catch (error) {
    next({
      name: 'InvalidToken'
    })
  }
}

const authorization = (req, res, next) => {
  const { id } = req.params
  try {
    Product.findOne({
      where:{
        id
      }
    })
    .then(data => {
      if(!data){
        next({
          name: 'NoData'
        })
      }else if(data.UserId !== req.userData.id || req.userData.role !== 'admin'){
        next({
          name: 'Forbidden'
        })
      }else{
        next()
      }
      })
      .catch(err => {
        next(err)
      })
  } catch (error) {
    next({
      name: 'InvalidToken'
    })
  }
}

module.exports = {
  authentication,
  authorization
}