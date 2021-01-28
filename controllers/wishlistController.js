const { Wishlist } = require('../models');

class WishlistClass {
  static async getAll(req, res, next) {
    try {
      const wishlist = await Wishlist.findAll({
        include: ['product'],
        where: { userId: req.user.id }
      });

      if (!wishlist) return next({ name: 'notFound' });

      return res.status(200).json(wishlist)
    } catch (error) {
      next(error);
    }
  }

  static async findOrCreate(req, res, next) {
    try {
      const { productId } = req.body;

      // FIND OR CREATE NEW WISHLIST
      // IF WISHLIST DOESN'T EXIST, INSERTED VALUE BE DEFAULTS OBJECT OTHERWISE LEAVE IT
      const [findOrCreateWishlist] = await Wishlist.findOrCreate({
        where: { userId: req.user.id, productId },
        defaults: { userId: req.user.id, productId }
      })

      return res.status(200).json(findOrCreateWishlist);
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const wishlist = await Wishlist.findByPk(req.params.id);
      if (!wishlist) return next({ name: 'notFound' });

      await wishlist.destroy();

      return res.status(200).json({
        message: 'successfully remove wishlist'
      })
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = WishlistClass