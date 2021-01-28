const { Cart, Product } = require('../models')

class CartController {

  static showAllCart (req, res, next) {
    Cart.findAll({
      where: { UserId: +req.user.id, status: true },
      order: [['createdAt', 'ASC']],
      include: [Product]
    })
      .then(carts => {
        console.log('masuk sini')
        return res.status(200).json(carts)
      })
      .catch(err => {
        next(err)
      })
  }

  static addNewCart (req, res, next) {
    const UserId = +req.user.id
    const ProductId = +req.body.id
    const { status, quantity } = req.body
    const newCart = { status, quantity, ProductId, UserId }

    Cart.findOne({
      where: { UserId, ProductId },
      include: Product
    })
      .then(cart => {
        if (!cart) {
          return Cart.create(newCart)
        } else {
          const updateCart = { status: true, quantity: (cart.quantity + 1) }
          if (cart.quantity < cart.Product.stock) {
            return Cart.update(updateCart, {
              where: { UserId, ProductId },
              returning: true, plain: true
            })
          } else {
            next({ name: 'notEnoughStock' })
          }
        }
      })
      .then(cart => {
        if (cart.quantity > 1) {
          return res.status(200).json(cart[1])
        } else {
          return res.status(201).json(cart[1])
        }
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
    }

    static increaseQty (req, res, next) {
      const UserId = +req.user.id
      const id = +req.body.id
      
      Cart.findOne({
        where: { UserId, ProductId: id },
        include: Product
      })
        .then(cart => {
          if (cart.quantity < cart.Product.stock) {
            return Cart.increment('quantity', {
              where: { UserId, ProductId: id},
              returning: true, plain: true
            })
          } else {
            next({ name: 'notEnoughStock' })
          }
        })
        .then(cart => {
          return res.status(200).json(cart)
        })
        .catch(err => {
          next(err)
        })
    }

    static decreaseQty (req, res, next) {
      const UserId = +req.user.id
      const id = +req.body.id
      
      Cart.findOne({
        where: { UserId, ProductId: id },
        include: Product
      })
        .then(cart => {
          if (cart.quantity > 1) {
            return Cart.decrement('quantity', {
              where: { UserId, ProductId: id},
              returning: true, plain: true
            })
          } else {
            const status = { status: false, quantity: 0}
            return Cart.update(status, {
              where: { UserId, ProductId: id},
              returning: true, plain: true
            })
          }
        })
        .then(cart => {
          return res.status(200).json(cart)
        })
        .catch(err => {
          next(err)
        })
    }

    static deleteCart (req, res, next) {
      const UserId = +req.user.id
      const ProductId = +req.body.id 
      
      Cart.destroy({
        where: { UserId, ProductId }
      })
        .then(cart => {
          if (!cart) {
            next({ name: 'resourceNotFound' })
          } else {
            return res.status(200).json({ message: 'Cart succesfully deleted'})
          }
        })
        .catch(err => {
          next(err)
        })
    }

    static checkout (req, res, next) {
      const UserId = +req.user.id
      const id = +req.body.id
      
      Cart.findAll({
        where: { UserId, status: true },
        include: Product
      })
        .then(cart => {
          console.log(cart, 'ini isi cart aktif')
          // return Product.decrement(
          //   ['stock', `${cart.}`]
          //   { where: { UserId, ProductId: id},
          //   returning: true, plain: true
          // })
        })
        .then(cart => {
          // return res.status(200).json(cart)
        })
        .catch(err => {
          next(err)
        })
    }
}

module.exports = CartController