const ProductController = require('../controllers/productController')
const router = require('express').Router()

router.post('/', ProductController.addProduct)
router.get('/:id', ProductController.getOneProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router