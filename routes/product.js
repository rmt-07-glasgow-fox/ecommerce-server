const router = require('express').Router()

const { author } = require('../middleware/auth')

const ProductController = require('../controller/productController')

router.get('/', ProductController.fetchAll)
router.get('/:id', author, ProductController.getProductId)
router.post('/', ProductController.addProduct)
router.put('/:id',author, ProductController.updateProd)
router.delete('/:id',author, ProductController.delProduct)

module.exports = router