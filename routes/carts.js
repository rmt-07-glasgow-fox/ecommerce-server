const router = require('express').Router()
const CartController = require('../controllers/CartController')


router.get('/', CartController.showAllCart)
router.post('/', CartController.addNewCart)
router.patch('/increase', CartController.increaseQty)
router.patch('/decrease', CartController.decreaseQty)
router.delete('/', CartController.deleteCart)
router.patch('/', CartController.checkout)

module.exports = router