const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const { authorize } = require('../middlewares/auth')

router.get('/', ProductController.fetchProducts)
router.post('/', authorize, ProductController.createProduct)
router.get('/:id', ProductController.fetchProduct)
router.put('/:id', authorize, ProductController.updateProduct)
router.delete('/:id', authorize, ProductController.deleteProduct)
router.patch('/stock/:id', authorize, ProductController.updateStock)
router.patch('/price/:id', authorize, ProductController.updatePrice)
router.patch('/status/:id', authorize, ProductController.updateStatus)

module.exports = router;