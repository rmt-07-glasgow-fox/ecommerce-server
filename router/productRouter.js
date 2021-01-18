const router = require('express').Router()
const ProductController = require('../controllers/productController')

router.post('/', ProductController.createProduct)
router.get('/', ProductController.readProduct)
router.put('/', ProductController.updateProduct)
router.delete('/', ProductController.deleteProduct)

module.exports = router