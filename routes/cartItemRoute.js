const { CartItemController } = require('../controllers/CartItemController')

const router = require('express').Router()

router.patch('/carts/:id', CartItemController.setQuantity)
router.delete('/cartItems/:id', CartItemController.deleteCartItem)

module.exports = router