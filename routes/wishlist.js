const router = require('express').Router()

const wishlistController = require('../controllers/wishlist')
const { authenticate, authCustomer } = require('../middlewares/auth')

router.use('/', authenticate)
router.post('/', wishlistController.addItem)
router.get('/', wishlistController.getItems)

router.use('/', authCustomer)
router.delete('/:itemId', wishlistController.deleteItem)

module.exports = router
