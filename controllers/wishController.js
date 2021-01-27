const { Wishlist, Product } = require('../models/index')

class Controller {
  static create (req, res, next) {
    let obj = {
      ProductId : req.body.id,
      UserId : req.user.id
    }

    Wishlist.findOne({where: {UserId: obj.UserId, ProductId: obj.ProductId}})
    .then(data => {
      if (data) {
        next({name: `wishListErr`})
      } else {
        return Wishlist.create(obj)
      }
    })
    .then(data => {
      return res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static showWish (req, res, next) {
    Wishlist.findAll({where: {UserId: req.user.id}, include: Product})
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static destroy (req, res, next) {
    let id = req.body.id
    let UserId = req.user.id

    Wishlist.destroy({where: {UserId, ProductId: id}})
    .then(data => {
      return res.status(200).json({msg: `Item successfully removed from your wishlist`})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller