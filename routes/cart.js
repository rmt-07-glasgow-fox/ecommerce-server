const router = require('express').Router()

const CartController = require('../controller/cartController')

router.get('/', CartController.fetchCart)
router.post('/', CartController.addCart)
router.put('/:id', CartController.updateStock)
router.delete('/:id', CartController.delCart)


module.exports = router