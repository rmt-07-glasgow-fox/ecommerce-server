const { CartController } = require('../controllers')
const { cartAuthorized } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.get('/', CartController.getCarts)
router.post('/', CartController.addCarts)
router.put('/', CartController.checkout)
router.patch('/:id', cartAuthorized, CartController.updateCarts)
router.delete('/:id', cartAuthorized, CartController.removeCarts)

module.exports = router