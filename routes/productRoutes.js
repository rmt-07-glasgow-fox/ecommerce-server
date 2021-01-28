const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { productAuthorization, authentication } = require('../middlewares/auth')

router.get('/', ProductController.getAllProducts)
router.use(authentication)
router.post('/', ProductController.addProduct)
router.get('/:id', productAuthorization, ProductController.getProductById)
router.put('/:id', productAuthorization, ProductController.editProductById)
router.delete('/:id', productAuthorization, ProductController.deleteProductById)

module.exports = router