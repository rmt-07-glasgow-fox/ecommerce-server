const router = require('express').Router()
const CartController = require('../controllers/cartController')

router.post('/', CartController.addCart)
router.get('/', CartController.getAllCart)
router.delete('/:id', CartController.deleteCart)
router.patch('/:id', CartController.updateQuantity)

module.exports = router