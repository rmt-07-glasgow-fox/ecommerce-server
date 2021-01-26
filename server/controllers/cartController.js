const { Cart, Product } = require('../models')

class CartController {
  static getCarts(req, res, next) {
    let userId = req.userData.id
    Cart.findAll({
      where: {
        UserId: userId
      },
      include: [Product]
    }).then(data => {
      res.status(200).json(data)
    }).catch(err => {
      next(err)
    })
  }

  static addCarts(req, res, next) {
    let UserId =  +req.userData.id
    let ProductId = +req.body.productId
    let quantity = +req.body.quantity
    let stock
    Product.findOne({
      where: {
        id: ProductId
      }
    }).then(data => {
      if(data) {
        stock = data.stock
        return Cart.findOne({
          where: {
            UserId,
            ProductId
          }
        })
      } else {
        next({ status: 404 })
      }
    })
    .then(data => {
      if(data) {
        let newQty = data.quantity + quantity
        if(stock >= newQty) {
          let newData = {
            ProductId,
            UserId,
            quantity: newQty
          }
          return Cart.update(newData, {
            where: {
              id: data.id
            },
            returning: true
          })
        } else {
          next({
            status: 400,
            message: "Not enough stock"
          })
        }
      } else {
        if(stock >= quantity) {
          let newData = {
            ProductId,
            UserId,
            quantity
          }
          return Cart.create(newData)
        } else {
          next({
            status: 400,
            message: "Not enough stock"
          })
        }
      }
    }).then(data => {
      if (Array.isArray(data)) {
        res.status(200).json(data[1][0])
      } else {
        res.status(201).json(data)
      }
    }).catch(err => {
      if(err.name === "SequelizeValidationError") {
        next({
          status: 400,
          errors: err.errors
        })
      } else {
        next(err)
      }
    })
  }

  static updateCarts(req, res, next) {
    let value = {
      quantity: req.body.quantity
    }
    Cart.update(value, {
      where: {
        id: req.params.id
      },
      returning: true
    }).then(data => {
      if (data[0]) {
        res.status(200).json(data[1][0])
      } else {
        next({
          status: 404
        })
      }
    }).catch(err => {
      if(err.name === "SequelizeValidationError") {
        next({
          status: 400,
          errors: err.errors
        })
      } else {
        next(err)
      }
    })
  }

  static removeCarts(req, res, next) {
    Cart.destroy({
      where: {
        id: req.params.id
      }
    }).then(data => {
      if(data) {
        res.status(200).json({
          message: "Seccuss delete cart"
        })
      } else {
        next({ status: 404 })
      }
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = CartController