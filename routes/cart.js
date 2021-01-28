const express = require('express')
const router = express.Router()
const Controller = require('../controller/cartCont')

router.get('/', Controller.getUserCarts)
router.post('/:productId', Controller.createCart)
router.patch('/:productId', Controller.updateCart)
router.delete('/:productId', Controller.removeCartItem)

module.exports = router;