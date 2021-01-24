const router = require('express').Router();
const ProductController = require('../controllers/productController');
const { authorize } = require('../middlewares/auth');

router.get('/', ProductController.getProducts);
router.post('/', authorize, ProductController.postProduct);
router.get('/:id', ProductController.getProduct);
router.put('/:id', authorize, ProductController.putProduct);
router.delete('/:id', authorize, ProductController.deleteProduct);

module.exports = router;