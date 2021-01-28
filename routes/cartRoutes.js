const router = require('express').Router()
const CartController = require('../controllers/cartController')
const ProductController = require('../controllers/productController')
const { authentication } = require('../middlewares/auth')


router.get('/products', ProductController.getProductHandler)
router.use(authentication)
router.get('/carts', CartController.getAllCartHandler)
router.post('/carts', CartController.postAllCartHandler)
router.patch('/carts', CartController.patchCartHandler)
router.delete('/carts', CartController.deleteCartHandler)

module.exports = router