class wishlistController {

  static async addItem (req, res, next) {
    const { ProductId } = req.body
    const user = req.user

    try {
      const wishlist = await user.getWishlist()
      const result = await wishlist.addProduct(ProductId)

      res.status(201).json({ message: 'Product added to wishlist' })
    } catch (err) {
      next(err)
    }
  }

  static async getItems (req, res, next) {
    const user = req.user

    try {
      const wishlist = await user.getWishlist()
      const items = await wishlist.getProducts({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        joinTableAttributes: []
      })

      res.status(200).json(items)
    } catch (err) {
      next(err)
    }
  }

  static async deleteItem (req, res, next) {
    const id = req.params.itemId
    const user = req.user

    try {
      const wishlist = await user.getWishlist()
      const result = await wishlist.removeProduct(id)

      if (result > 0) {
        res.status(200).json({ message: 'Product removed from wishlist' })
      } else {
        next({ name: 'WishlistItemNotFound' })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = wishlistController
