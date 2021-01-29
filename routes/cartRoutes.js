const router = require('express').Router()
const CartController = require('../controllers/cartController')
const { authorizationCustomer, authentication } = require('../middlewares/auth')

router.use(authentication)
router.get('/carts', authorizationCustomer, CartController.getAllCartHandler)
router.post('/carts', authorizationCustomer, CartController.postAllCartHandler)
router.patch('/carts', authorizationCustomer, CartController.patchCartHandler)
router.delete('/carts', authorizationCustomer, CartController.deleteCartHandler)

module.exports = router