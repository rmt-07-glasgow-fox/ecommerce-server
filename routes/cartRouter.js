const router = require ('express').Router()
const CartController = require ('../controller/CartController')
const { authorize, authenticate } = require ('../middlewares/auth')

router.use (authenticate)

router.get ('/cart/:userId', CartController.getCart)

router.post ('/cart/:userId', CartController.postCart)

router.patch ('/cart/:cartId', authorize, CartController.patchCart)

router.delete ('/cart/:cartId', authorize, CartController.deleteCart)

module.exports = router