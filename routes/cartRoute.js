const { CartController } = require('../controllers/CartController')

const router = require('express').Router()

router.post('/carts/addToCart', CartController.addToCart)
router.get('/carts', CartController.showCarts)
router.post('/carts/checkout', CartController.checkout)

module.exports = router