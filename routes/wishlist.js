const WishlistController = require('../controllers/wishlistController')
const Auth = require('../middlewares/auth')

const router = require('express').Router()
router.use(Auth.authentication)
router.get('/customer', WishlistController.findByCust)
router.post('/', WishlistController.create)
router.delete('/:id', Auth.authorizationWishlist, WishlistController.delete)

module.exports = router