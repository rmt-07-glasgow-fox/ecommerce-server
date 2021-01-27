const { Cart, Product } = require('../models')

class CartController {
  static getCarts(req, res, next) {
    let userId = req.userData.id
    Cart.findAll({
      where: {
        UserId: userId
      },
      include: [Product],
      order: [['createdAt', 'ASC']]
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
            ProductId,
            checkout: false
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
    let id = req.params.id
    console.log(id);
    let quantity = +req.body.quantity
    Cart.findByPk(id, {
      include: [Product]
    }).then(data => {
      console.log(data);
      if(data) {
        let stock = data.Product.stock
        let newQty = data.quantity + quantity
        if(stock >= newQty) {
          let newData = {
            quantity: newQty
          }
          return Cart.update(newData, {
            where: { id },
            returning: true
          })
        } else {
          next({
            status: 400,
            message: "Not enough stock"
          })
        }
      } else {
        next({ status: 404 })
      }
    })
    .then(data => {
      res.status(200).json(data[1][0])
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

  // static checkout (req, res, next) {
  //   let cartId = req.body[0].id
  //   let productId = req.body[0].ProductId
  //   let qty = req.body[0].quantity
  //   console.log(qty);
  //   Product.decrement({
  //     stock: qty
  //   },{
  //     where: {
  //       id: productId
  //     }
  //   }).then(data => {
  //     if(data[0][0]) {
  //       return Cart.update({
  //         checkout: true
  //       },{
  //         where: {
  //           id: cartId
  //         },
  //         returning: true
  //       })
  //     } else {
  //       next({
  //         status: 400,
  //         message: 'Not enough stock'
  //       })
  //     }
  //   }).then(data => {
  //     console.log(data[1][0]);
  //     if(data[1][0]) {
  //       res.status(200).json({
  //         message: "Success Checkout"
  //       })
  //     } else {
  //       next({ status: 404 })
  //     }
  //   }).catch(err => {
  //       next(err)
  //   })
  // }

  static async checkout(req, res, next) {
    try {
      for (const cart of req.body) {
        let cartId = cart.id
        let productId = cart.ProductId
        let qty = cart.quantity
        let data
        const result = await Product.decrement({
          stock: qty
        },{
          where: {
            id: productId
          }
        })
        // after update product
        if (result[0][0]) {
          data = await Cart.update({
            checkout: true
          },{
            where: {
              id: cartId
            },
            returning: true
          })
        } else {
          next({ status: 404 })
        }
        // after update cart
        if(data[1][0]) {
          res.status(200).json({
            message: "Success Checkout"
          })
        } else {
          next({ status: 404 })
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController