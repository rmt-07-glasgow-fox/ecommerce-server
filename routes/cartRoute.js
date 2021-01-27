const { CartController } = require('../controllers/CartController')

const router = require('express').Router()

router.post('/carts/addToCart', CartController.addToCart)
router.get('/carts', CartController.showCarts)

module.exports = router