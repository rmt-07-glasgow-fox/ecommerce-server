const router = require('express').Router()
const ProductController = require('../controllers/productController')
const { authorization, authentication } = require('../middlewares/auth')

router.get('/', ProductController.getProductHandler)
router.use(authentication)
router.post('/', authorization, ProductController.postProductHandler)
router.get('/:id', authorization, ProductController.getProductByIdHandler)
router.put('/:id', authorization, ProductController.putProductHandler)
router.delete('/:id', authorization, ProductController.deleteProductHandler)

module.exports = router