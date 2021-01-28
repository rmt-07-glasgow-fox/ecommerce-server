const router = require('express').Router()
const CartController = require('../controllers/cartController')

router.get('/',CartController.get)
router.put('/:id',CartController.update)
router.post('/',CartController.create)
router.delete('/:id',CartController.delete)

module.exports = router