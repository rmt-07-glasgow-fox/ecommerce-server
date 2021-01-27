const router = require('express').Router();
const wishlistController = require('../controllers/wishlistController')

router.get('/wishlist', wishlistController.getAll);
router.post('/wishlist/add', wishlistController.findOrCreate);
router.delete('/wishlist/:id/product/:productId', wishlistController.destroy);

module.exports = router