const router = require('express').Router()
const ProductController = require('../controllers/productController')
const { authorization } = require('../middlewares/auth')

router.post('/', authorization, ProductController.postProductHandler)
router.get('/', authorization, ProductController.getProductHandler)
router.get('/:id', authorization, ProductController.getProductByIdHandler)
router.put('/:id', authorization, ProductController.putProductHandler)
router.delete('/:id', authorization, ProductController.deleteProductHandler)

module.exports = router