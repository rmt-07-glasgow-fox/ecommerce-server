const router = require('express').Router()
const CartController = require('../controllers/cartController')
const ProductController = require('../controllers/productController')
const { authentication, authorizationCustomer } = require('../middlewares/auth')


router.get('/products', ProductController.getProductHandler)
router.use(authentication)
router.get('/carts', authorizationCustomer, CartController.getAllCartHandler)
router.post('/carts', authorizationCustomer, CartController.postAllCartHandler)
router.patch('/carts', authorizationCustomer, CartController.patchCartHandler)
router.delete('/carts', authorizationCustomer, CartController.deleteCartHandler)

module.exports = router