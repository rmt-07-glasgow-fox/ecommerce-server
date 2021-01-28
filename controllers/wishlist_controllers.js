const { Wishlist, User, Product } = require('../models')

class WishlistController {
  static createWishlist(req, res, next) {
    const { ProductId } = req.body
    let obj = {
      UserId: req.user.id,
      ProductId,
    }
    Wishlist.create(obj)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static findWishlist(req, res, next) {
    Wishlist.findAll({
      where: {
        UserId: req.user.id
      },
      include: Product
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static isInWishlist(req, res, next) {
    // console.log('masuk isin cart')
    const id = +req.params.id
    // console.log(id, 'ini dri cont isins')
    Wishlist.findOne({
      where: {
        UserId: req.user.id,
        ProductId: id
      }
    })
      .then(data => {
        // console.log(data)
        if (!data) {
          res.status(200).json({message: 'not in wishlist'})
        } else {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static destroyWishlist(req, res, next) {
    const id = +req.params.id
    Wishlist.destroy({
        where: {
            id
        }
    })
    .then(data => {
        if (!data) {
            next({ name: 'Data Not Found'})
        } else {
            res.status(200).json({message: 'Wishlist Has Been Succesfully Deleted'})
        }
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
  }
}

module.exports = { WishlistController }