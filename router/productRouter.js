const router = require('express').Router()

// import
const ProductController = require('../controllers/productController')
const { authorizeAdminOnly } = require('../middleware/auth')

router.post('/', authorizeAdminOnly, ProductController.createProduct)
router.get('/', ProductController.readProduct)
router.put('/', authorizeAdminOnly, ProductController.updateProduct)
router.delete('/', authorizeAdminOnly, ProductController.deleteProduct)

module.exports = router