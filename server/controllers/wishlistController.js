const { Wishlist, Product } = require('../models')

class WishlistController {
  static getWishlist(req, res, next) {
    try {
      const data = Wishlist.findAll({ 
        where: { UserId: req.userData.id },
        include: [Product]
      })
      if (data) res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static addWishList(req, res, next) {
    try {
      const data = Wishlist.create({
        UserId: req.userData.id,
        ProductId: req.body.ProductId
      })
      if (data) res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static removeWishList(req, res, next) {
    try {
      const data = Wishlist.destroy({ where: { id: req.params.id }})
      if (data) res.status(200).json({ message: "Success delete" })
      else next({ status: 404 })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = WishlistController