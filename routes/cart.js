const CartController = require('../controllers/cartController')
const { authCust } = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', CartController.showCart)
router.post('/', CartController.addCart)
router.delete('/:id', authCust, CartController.deleteCart)
router.put('/:id', authCust, CartController.updateCart)

module.exports = router