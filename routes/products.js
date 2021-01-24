const router = require('express').Router()

const productsController = require('../controllers/products')

router.get('/', productsController.getAllProducts)
router.post('/', productsController.create)
router.get('/:productId', productsController.getProduct)
router.put('/:productId', productsController.updateProduct)
router.delete('/:productId', productsController.deleteProduct)

module.exports = router
