const { WishlistController } = require('../controllers')
const router = require('express').Router()

router.get('/', WishlistController.getWishlist)
router.post('/', WishlistController.addWishList)
router.delete('/:id', WishlistController.removeWishList)

module.exports = router