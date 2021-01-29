const router = require('express').Router();
const WishlistController = require('../controllers/wishlistController.js');

router.get('/', WishlistController.readWishlist);
router.get('/:id', WishlistController.readOneWishlist);
router.post('/', WishlistController.createWishlist);
router.delete('/:id', WishlistController.deleteWishlist);

module.exports = router;