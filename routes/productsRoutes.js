const router = require('express').Router()
const ProductController = require('../controllers/productController')
const { authorization } = require('../middlewares/auth')

router.post('/', authorization, ProductController.postProductHandler)
router.get('/:id', ProductController.getProductByIdHandler)
router.put('/:id', authorization, ProductController.putProductHandler)
router.delete('/:id', authorization, ProductController.deleteProductHandler)

module.exports = router