const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', ProductController.fetchProducts)
router.get('/:id', ProductController.fetchProduct)

router.use(authenticate)
router.post('/', authorize, ProductController.createProduct)
router.put('/:id', authorize, ProductController.updateProduct)
router.delete('/:id', authorize, ProductController.deleteProduct)
router.patch('/stock/:id', ProductController.updateStock)
router.patch('/price/:id', authorize, ProductController.updatePrice)
router.patch('/status/:id', authorize, ProductController.updateStatus)

module.exports = router;