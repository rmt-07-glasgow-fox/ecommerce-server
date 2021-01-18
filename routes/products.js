const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
// const { authorization } = require('../middlewares/auth')

router.get('/', ProductController.getProducts)
router.post('/', ProductController.createProduct)

router.put('/', ProductController.updateProduct)
router.delete('/', ProductController.destroyProduct)


module.exports = router