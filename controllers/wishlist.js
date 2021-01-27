const { Wishlist, Product, Category } = require('../models')

class WishlistController {
  static async getWishlists (req, res, next) {
    const UserId = req.loggedIn.id

    try {
      const wishlists = await Wishlist.findAll({
         where: {
           UserId
         },
         include: [{
           model: Product,
           include: [{
            model: Category
          }]
         }]
      })

      res.status(200).json({wishlists})
    } catch (error) {
      next(error)
    }
  }

  static async postWishlist (req, res, next) {
    const ProductId = req.params.id
    const UserId = req.loggedIn.id

    try {
      const find = await Wishlist.findOne({
        where: {
          ProductId,
          UserId
        }
      })

      if (find) {
        throw {
          status: 400,
          message: `Item is Already on The Wishlist`
        }
      } else {
        const wishlist = await Wishlist.create({
          UserId,
          ProductId
        })
  
        res.status(200).json({wishlist})
      }
      
    } catch (error) {
      next(error)
    }
  }

  static async deleteWishlist (req, res, next) {
    const id = req.params.id

    try {
      const wishlist = await Wishlist.destroy({
        where: {
          id
        }
      })

      res.status(200).json({message: 'Product Has Been Removed From Wishlist'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = WishlistController