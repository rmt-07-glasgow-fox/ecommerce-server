const router = require('express').Router()
const Controller = require('../controllers/wishlist')

router.get('/', Controller.getWishlist)
router.post('/', Controller.postWishlist)
router.delete('/:id', Controller.deleteWishlist)

module.exports = router
