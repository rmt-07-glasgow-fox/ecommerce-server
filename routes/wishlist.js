const routes = require('express').Router()
const { WishlistController } = require('../controllers')
const custAuth = require('../middlewares/cust-authorization')
const checkProductId = require('../middlewares/check-productid')
const checkWishlistId = require('../middlewares/check-wishlistid')

routes.get('/wishlists', WishlistController.getWishlists)

routes.use('/wishlists', custAuth)

routes.post('/wishlists/:id', checkProductId, WishlistController.postWishlist)
routes.delete('/wishlists/:id', checkWishlistId, WishlistController.deleteWishlist)


module.exports = routes