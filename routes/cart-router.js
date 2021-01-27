const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cart-controller')

router.get('/carts', CartController.readCart)
router.get('/carts/:cartid', CartController.getCartProduct)
router.delete('/carts/:cartid/:productid', CartController.removeCart)
router.patch('/carts/:cartid/:productid', CartController.updateCart)
router.post('/carts/:cartid/:productid', CartController.addCart)

module.exports = router
