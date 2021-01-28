const { Wishlist, Product } = require('../models');

class WishlistController {
  static async add (req, res, next) {
    try {
      const UserId = req.userId;
      const { ProductId } = req.body;
      const wishlist = await Wishlist.findOrCreate({
        where: { UserId, ProductId },
        defaults: { UserId, ProductId }
      })
      return res.status(201).json(wishlist);
    } catch (err) {
      return next(err);
    }
  }

  static async getAll (req, res, next) {
    try {
      const UserId = req.userId
      const wishlists = await Wishlist.findAll({
        where: { UserId },
        include: {
          model: Product
        }
      })
      const response = wishlists.map(wishlist => {
        const { id, ProductId } = wishlist
        const obj = {
          id,
          ProductId,
          productName: wishlist.Product.name,
          productPrice: wishlist.Product.price,
          image: wishlist.Product.imageUrl
        }
        return obj
      })
      res.status(200).json(response)
    } catch (err) {
      console.log(err);
      return next(err);
    }    
  }

  static async delete (req, res, next) {
    try {
      const id = req.params.id;
      const status = await Wishlist.destroy({ where: { id } });
      if (status === 1) {
        return res.status(200).json({ message: 'Success delete wishlist' })
      } else {
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = WishlistController