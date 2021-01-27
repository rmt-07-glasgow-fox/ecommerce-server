const { Cart, Product } = require('../models/index')

class Controller {
  static showCart (req, res, next) {
    Cart.findAll({where: {UserId: req.user.id}, include: Product})
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static addCart (req, res, next) {
    let obj = {
      ProductId: req.body.id,
      UserId: req.user.id
    }

    console.log(obj.id)
    Cart.findOne({where: {UserId : obj.UserId, ProductId: obj.ProductId}, include: Product})
    .then(data => {
      if(data) {
        if(data.quantity < data.Product.stock){
          return Cart.increment('quantity', {where: {UserId: obj.UserId, ProductId: obj.ProductId}, returning: true, plain:true})
        }else if (data.quantity >= data.Product.stock) {
          next({name: `quantityBadRequest`})
        }
      } else {
        return Cart.create(obj)
      }
    })
    .then(data => {
      if(data.quantity > 1) {
        return res.status(200).json(data[1])
      }
      return res.status(201).json(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static increase (req, res, next) {
    let id = req.body.id
    let UserId = req.user.id

    Cart.findOne({where: {UserId, ProductId: id}, include: Product})
    .then(data => {
      if (data.quantity < data.Product.stock) {
        return Cart.increment('quantity', {where: {UserId, ProductId: id}, returning: true, plain:true})
      } else if (data.quantity >= data.Product.stock) {
        next({name: `quantityBadRequest`})
      }
    })
    .then(data => {
      return res.status(200).json(data[1])
    })
    .catch(err => {
      next(err)
    })
  }

  static decrease (req, res, next) {
    let id = req.body.id
    let UserId = req.user.id

    Cart.findOne({where: {UserId, ProductId: id}, include: Product})
    .then(data => {
      if (data.quantity > 1) {
        return Cart.decrement('quantity', {where: {UserId, ProductId: id}, returning: true, plain:true})
      } else if (data.quantity <= 1) {
        next({name: `quantityBad`})
      }
    })
    .then(data => {
      return res.status(200).json(data[1])
    })
    .catch(err => {
      next(err)
    })
  }

  static destroy (req, res, next) {
    let id = req.body.id
    let UserId = req.user.id
    //console.log(id, 'masuk siniii')
    Cart.destroy({where: {UserId, ProductId: id}})
    .then(data => {
      return res.status(200).json({msg: `Item successfully removed from your cart`})
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}

module.exports = Controller