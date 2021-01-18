const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.post('/', ProductController.addProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)
router.put('/:id', ProductController.editProductById)
router.delete('/:id', ProductController.deleteProductById)

module.exports = router