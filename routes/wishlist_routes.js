const express = require('express')
const router = express.Router()
const { WishlistController } = require('../controllers/wishlist_controllers')

router.get('/', WishlistController.findWishlist)
router.get('/:id', WishlistController.isInWishlist)
router.post('/', WishlistController.createWishlist)
router.delete('/:id', WishlistController.destroyWishlist)

module.exports = router