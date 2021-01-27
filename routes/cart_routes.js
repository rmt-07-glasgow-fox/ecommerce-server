const express = require('express')
const router = express.Router()
const { CartController } = require('../controllers/cart_controllers')

router.get('/', CartController.findCart)
router.post('/', CartController.createCart)
router.put('/:id', CartController.updateCart)
router.delete('/:id', CartController.destroyCart)

module.exports = router