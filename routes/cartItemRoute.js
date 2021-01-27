const { CartItemController } = require('../controllers/CartItemController')

const router = require('express').Router()

router.patch('/cartItems/:id', CartItemController.setQuantity)
router.delete('/cartItems/:id', CartItemController.deleteCartItem)

module.exports = router