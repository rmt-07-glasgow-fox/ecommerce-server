const { Cart, Product } = require('../models')
const { sequelize } = require('../models')

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
        console.log(newQty);
        console.log(stock);
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
          console.log('habis');
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
      if(data) {
        if (Array.isArray(data)) {
          res.status(200).json(data[1][0])
        } else {
          res.status(201).json(data)
        }
      } else {
        next({
          status: 400,
          message: "Not enough stock"
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

  static updateCarts(req, res, next) {
    let id = req.params.id
    console.log(id);
    let quantity = +req.body.quantity
    Cart.findByPk(id, {
      include: [Product]
    }).then(data => {
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

  static async checkout(req, res, next) {
    const t = await sequelize.transaction()
    try {
      const UserId = req.userData.id
      const carts = await Cart.findAll({
        where: {
          UserId,
          checkout: false
        },
        include: [Product]
      })
      try {
        let errors = []
        for (const cart of carts) {
          const CartId = cart.id
          const ProductId = cart.ProductId
          const quantity = cart.quantity
          let product
          let data
          const checkStock = await Product.findByPk(ProductId)
          if(checkStock.stock >= quantity) {
            product = await Product.decrement({
              stock: quantity
            },{
              where: {
                id: ProductId
              },
              transaction: t
            })
          } 
          if (product) {
            data = await Cart.update({
              checkout: true
            },{
              where: {
                id: CartId
              },
              transaction: t,
              returning: true
            })
          } else {
            errors.push({
              message: `${checkStock.name} not enough stock`
            })
          }     
        }
        if (!errors.length) {
          await t.commit()
          res.status(200).json({
            message: "Success Checkout"
          })
        } else {
          await t.rollback()
          next({
            status: 400,
            errors: errors
          })
        }
      } catch (err) {
        await t.rollback()
        next(err)
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController