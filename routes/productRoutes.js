const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/auth').authorization

router.post('/', ProductController.addProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:id', authorization, ProductController.getProductById)
router.put('/:id', authorization, ProductController.editProductById)
router.delete('/:id', authorization, ProductController.deleteProductById)

module.exports = router