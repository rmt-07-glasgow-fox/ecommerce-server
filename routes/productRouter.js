const router = require('express').Router();
const ProductController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.use(authenticate);
router.post('/', authorize, ProductController.postProduct);
router.put('/:id', authorize, ProductController.putProduct);
router.delete('/:id', authorize, ProductController.deleteProduct);

module.exports = router;