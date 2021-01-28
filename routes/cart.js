const router = require('express').Router()

const cartController = require('../controllers/cart')
const { authenticate, authCustomer } = require('../middlewares/auth')

router.use('/', authenticate)
router.post('/', cartController.addItem)
router.get('/', cartController.getItems)
router.patch('/:productId', cartController.updateItem)

// router.use('/', authCustomer)
router.delete('/:productId', cartController.deleteItem)

module.exports = router
