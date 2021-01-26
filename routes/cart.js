const router = require('express').Router()
const cartController = require('../controllers/cartController')

router.get('cart', cartController.get)
router.patch('/cart/:id', cartController.updateStatus)

module.exports = router