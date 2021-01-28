const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authorization } = require('../middlewares/auth')

router.get('/', ProductController.getProducts)
router.post('/', ProductController.createProduct)
router.get('/:id', ProductController.getProductById)
router.put('/:id', authorization, ProductController.updateProduct)
router.delete('/:id', authorization, ProductController.destroyProduct)


module.exports = router