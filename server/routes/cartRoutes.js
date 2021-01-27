const { CartController } = require('../controllers')
const { cartAuthorized } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.get('/', CartController.getCarts)
router.post('/', CartController.addCarts)
router.patch('/:id', cartAuthorized, CartController.updateCarts)
router.delete('/:id', cartAuthorized, CartController.removeCarts)
router.put('/checkout', CartController.checkout)

module.exports = router