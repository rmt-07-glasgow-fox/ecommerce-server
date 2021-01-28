const router = require('express').Router()
const CartController = require('../controllers/cartController')

router.get ('/', CartController.listCart)
router.post ('/', CartController.addToCart)
router.patch ('/:id', CartController.changeCart)
router.delete ('/:id', CartController.removeCart)

module.exports = router