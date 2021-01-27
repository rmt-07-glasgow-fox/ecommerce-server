const router = require('express').Router()

const productsController = require('../controllers/products')
const { authenticate, authAdmin } = require('../middlewares/auth')

// open to all
router.get('/', productsController.getAllProducts)
router.get('/:productId', productsController.getProduct)

// need to authenticate and authorized for admin only
router.use('/', authenticate)
router.use('/', authAdmin)

router.post('/', productsController.create)
router.put('/:productId', productsController.updateProduct)
router.delete('/:productId', productsController.deleteProduct)

module.exports = router
