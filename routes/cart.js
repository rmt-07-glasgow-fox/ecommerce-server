const CartController = require('../controllers/cartController')

const router = require('express').Router()

router.get('/', CartController.showCart)
router.post('/', CartController.addCart)
router.delete('/:id', CartController.deleteCart)
router.put('/:id', CartController.updateCart)

module.exports = router