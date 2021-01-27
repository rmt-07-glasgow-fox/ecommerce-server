const router = require('express').Router()
const productController = require('../controllers/productController')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', productController.getProduct)

router.use(authenticate)
router.use(authorize)
router.post('/', productController.createProduct)
router.get('/:id', productController.getOneProduct)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)

module.exports = router