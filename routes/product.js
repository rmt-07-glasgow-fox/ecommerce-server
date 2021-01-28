const router = require('express').Router()
const ProductController = require('../controllers/productController')
const { authentication,authorization } = require('../middleware/auth')

router.get('/',ProductController.get)
router.use(authentication)
router.put('/:id/stock',ProductController.updateStock)
router.use(authorization)
router.put('/:id',ProductController.update)
router.post('/',ProductController.create)
router.delete('/:id',ProductController.delete)


module.exports = router