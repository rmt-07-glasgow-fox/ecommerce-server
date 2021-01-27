const { User, Banner, Cart, Category, Product } = require('../models')
const { verifyToken } = require('../helpers')

function authenticate(req, res, next){
  try {
    let decode = verifyToken(req.headers.access_token)
    User.findByPk(decode.id)
    .then(data => {
      if(data){
        req.userData = {
          id: data.id,
          email: data.email
        }
        next()
      } else {
        next({status: 401})
      }
    })
    .catch(err => {
      next(err)
    })
  } catch (error) {
    next({
      status: 400,
      errors: [error]
    })
  }
}

function productAuthorized (req, res, next) {
  let id = req.params.id
  let userId = req.userData.id
  Product.findByPk(id)
  .then(data => {
      if(data){
          if(data.UserId == userId){
              next()
          } else {
              next({status: 401})
          }
      } else {
          next({status: 404})
      }
  })
  .catch(err => {
      next(err)
  })
}

function categoryAuthorized (req, res, next) {
  let id = req.params.id
  let userId = req.userData.id
  Category.findByPk(id)
  .then(data => {
      if(data){
          if(data.UserId == userId){
              next()
          } else {
              next({status: 401})
          }
      } else {
          next({status: 404})
      }
  })
  .catch(err => {
      next(err)
  })
}

function bannerAuthorized (req, res, next) {
  let id = req.params.id
  let userId = req.userData.id
  Banner.findByPk(id)
  .then(data => {
      if(data){
          if(data.UserId == userId){
              next()
          } else {
              next({status: 401})
          }
      } else {
          next({status: 404})
      }
  })
  .catch(err => {
      next(err)
  })
}

function cartAuthorized (req, res, next) {
  let id = req.params.id
  let userId = req.userData.id
  Cart.findByPk(id)
  .then(data => {
      if(data){
          if(data.UserId == userId){
              next()
          } else {
              next({status: 401})
          }
      } else {
          next({status: 404})
      }
  })
  .catch(err => {
      next(err)
  })
}

// function authorized(req, res, next){
//   try {
//     let decode = verifyToken(req.headers.access_token)
//     User.findByPk(decode.id)
//     .then(data => {
//       if(data) {
//         if(data.role === 'admin') {
//           next()
//         } else {
//           next({status: 401})
//         }
//       } else {
//         next({status: 401})
//       }
//     }).catch(err => {
//       next(err)
//     })
//   } catch (error) {
//     next({
//       status: 400,
//       errors: [error]
//     })
//   }
// }

module.exports = {
  authenticate,
  productAuthorized,
  bannerAuthorized,
  categoryAuthorized,
  cartAuthorized
}