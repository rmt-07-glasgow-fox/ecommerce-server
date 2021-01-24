const router = require('express').Router()
const ProductController = require('../controllers/productController')
const { authorization } = require('../middleware/auth')

router.get('/',ProductController.get)
router.use(authorization)
router.post('/',ProductController.create)
router.put('/:id',ProductController.update)
router.delete('/:id',ProductController.delete)


module.exports = router