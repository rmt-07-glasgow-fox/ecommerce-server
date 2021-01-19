const router = require('express').Router()

// import
const ProductController = require('../controllers/productController')
const { authorizeAdminOnly } = require('../middleware/auth')

router.post('/', authorizeAdminOnly, ProductController.addProduct)
router.get('/', ProductController.showProduct)
router.put('/:id', authorizeAdminOnly, ProductController.editProduct)
router.delete('/:id', authorizeAdminOnly, ProductController.deleteProduct)

module.exports = router