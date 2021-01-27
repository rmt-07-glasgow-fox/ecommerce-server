const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const wishlistController = require('../controllers/wishlist')
const cartController = require('../controllers/cart')

const { authorize } = require('../middlewares/auth')


router.post('/',authorize, productController.insert)
router.get('/', productController.findAll)
router.put('/:id',authorize, productController.update)
router.patch('/:id',authorize, productController.patch)
router.delete('/:id',authorize, productController.delete)

router.get('/wishlist', wishlistController.getWishlist)
router.post('/wishlist', wishlistController.insert)
router.delete('/wishlist/:id', wishlistController.delete)

router.get('/cart', cartController.getCart)
router.post('/cart', cartController.insert)
router.patch('/cart/:id', cartController.patchQuantity)
router.patch('/checkout/', cartController.checkout)


router.delete('/cart/:id', cartController.delete)


module.exports = router