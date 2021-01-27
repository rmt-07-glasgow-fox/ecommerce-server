const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cart-controller')

router.get('/carts/:cartid', CartController.getCart)
router.delete('/carts/:cartid/:productid', CartController.removeCart)
router.put('/carts/:cartid/:productid', CartController.updateCart)
router.post('/carts/:cartid/:productid', CartController.addCart)

module.exports = router
