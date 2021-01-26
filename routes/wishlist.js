const router = require('express').Router()

const WishlistController = require('../controller/wishlistController')


router.get('/', WishlistController.showWish)
router.post('/', WishlistController.addWish)
router.delete('/:id', WishlistController.removeWish)


module.exports = router