const router = require('express').Router()

// import
const ProductController = require('../controllers/productController')
const { authorizeAdminOnly, checkBrandId, checkProductId } = require('../middleware/auth')

router.get('/', authorizeAdminOnly, ProductController.showProduct)
router.get('/:idProduct', authorizeAdminOnly, checkProductId, ProductController.showProductById)
router.post('/', authorizeAdminOnly, checkBrandId, ProductController.addProduct)
router.put('/:idProduct', authorizeAdminOnly, checkProductId, checkBrandId, ProductController.editProduct)
router.delete('/:idProduct', authorizeAdminOnly, checkProductId, ProductController.deleteProduct)

module.exports = router