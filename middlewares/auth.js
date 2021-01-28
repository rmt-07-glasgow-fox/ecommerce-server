const { User, Product, Banner, Category } = require('../models')
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

const productAuthorization = (req, res, next) => {
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

const bannerAuthorization = (req, res, next) => {
  const { id } = req.params
  try {
    Banner.findOne({
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

const categoryAuthorization = (req, res, next) => {
  const { id } = req.params
  try {
    Category.findOne({
      where:{
        id
      }
    })
      .then(data => {
        if(!data){
          next({
            name: 'NoData'
          })
        } else if (req.userData.role !== 'admin'){
          next({
            name: 'Forbidden'
          })
        } else {
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

const userAuthentication = (req, res, next) => {
  try {
    if(req.headers.access_token){
      let decryptedData = verifyToken(req.headers.access_token)
      if(decryptedData.role === 'customer'){
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

module.exports = {
  authentication,
  productAuthorization,
  bannerAuthorization,
  categoryAuthorization,
  userAuthentication
}