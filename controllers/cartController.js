const { Cart, Product, User } = require('../models')

class CartController {
  static getCarts (req, res, next) {
    let totalBayar = 0
    Cart.findAll({
      where: { UserId: req.user.id, status: false },
      include: [Product],
      order: [['createdAt', 'ASC']]
    })
      .then(data => {
        data.forEach(el => {
          totalBayar +=  (el.Product.price*el.quantity)
        })
        res.status(200).json({
          data,
          totalBayar
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static getHistories (req, res, next) {
    Cart.findAll({
      where: { UserId: req.user.id, status: true },
      include: [Product],
      order: [['updatedAt', 'ASC']]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static addToCart (req, res, next) {
    let isAdd = ''
    let stock = 0
    const newItem = {
      UserId: +req.user.id,
      ProductId: +req.body.ProductId,
      quantity: +req.body.quantity || 1,
      status: false
    }
    Product.findOne({
      where: { id: newItem.ProductId }
    })
      .then(data => {
        stock = data.stock
        if (stock < newItem.quantity) {
          console.log('out of stock, masuk ke if line 39')
          throw { name: 'outOfStock' }
        }
        return Cart.findOne({
          where: {
            ProductId: newItem.ProductId,
            UserId: newItem.UserId,
            status: false
          }
        })
      })
      .then(data => {
        if (data) {
          newItem.quantity += data.quantity
          isAdd = false
          console.log(stock, newItem.quantity)
          if (stock < newItem.quantity) {
            console.log('out of stock, masuk ke if line 54')
            throw { name: 'outOfStock' }
          }
          return Cart.update(newItem, {
            where: { id: data.id },
            returning: true
          })
        } else {
          isAdd = true
          return Cart.create(newItem)
        }
      })
      .then(data => {
        console.log(isAdd)
        if (isAdd) {
          res.status(201).json(data)
        } else {
          res.status(200).json(data[1][0])
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static minItem (req, res, next) {
    const id = +req.params.id
    Cart.findByPk(id)
      .then(data => {
        const newQuantity =  { quantity: data.quantity -= 1 }
        if (newQuantity.quantity < 1) {
          throw { name: 'minOfStock' }
        }
        return Cart.update(newQuantity, {
          where: { id },
          returning: true
        })
      })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
  static addItem (req, res, next) {
    const id = +req.params.id
    Cart.findByPk(id, {
      include: [Product]
    })
      .then(data => {
        const newQuantity =  { quantity: data.quantity += 1 }
        if (data.Product.stock < newQuantity.quantity) {
          throw { name: 'outOfStock' }
        }
        return Cart.update(newQuantity, {
          where: { id },
          returning: true
        })
      })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteCart (req, res, next) {
    const id = +req.params.id
    Cart.destroy({
      where: { id }
    })
      .then(data => {
        res.status(200).json({
          message: 'Cart success to delete'
        })
      })
      .catch(err => {
        next(err)
      })
  }
  // static checkout (req, res, next) {
  //   Cart.findAll({
  //     where: {
  //       UserId: req.user.id,
  //       status: false
  //     },
  //     include: [Product]
  //   })
  //     .then(data => {
  //       data.map(cart => {
  //         if (cart.Product.stock < cart.quantity) {
  //           throw { name: 'outOfStock' }
  //         }
  //       })
  //       data.map(cart => {
  //         Product.update({ stock: cart.Product.stock - cart.quantity },
  //           { where: { id: cart.ProductId }
  //         })
  //       })
  //       const dataUpdate = data.map(cart => {
  //         Cart.update({ status: true }, {
  //             where: { id: cart.id },
  //             returning: true
  //         })
  //       })
  //       console.log(dataUpdate)
  //       return Promise.all(dataUpdate)
  //     })
  //     .then(data => {
  //       res.status(200).json(data)
  //     })
  //     .catch(err => {
  //       next(err)
  //     })
  // }
  static async checkout (req, res, next) {
    try {
      const data = await Cart.findAll({
        where: {
          UserId: req.user.id,
          status: false
        },
        include: [Product]
      })
      data.map(cart => {
        if (cart.Product.stock < cart.quantity) {
          throw { name: 'outOfStock' }
        }
      })
      const productUpdate = []
      const cartUpdate = []
      data.map(cart => {
        productUpdate.push(Product.update({ stock: cart.Product.stock - cart.quantity },
          { where: { id: cart.ProductId },
          returning: true
        }))
      })
      data.map(cart => {
        cartUpdate.push(Cart.update({ status: true }, {
          where: { id: cart.id },
          returning: true
        }))
      })
      const results = await Promise.all(cartUpdate)
      const dataCarts = results.map(res => {
        return res[1][0]
      })
      res.status(200).json(dataCarts)
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = CartController