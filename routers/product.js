const router = require('express').Router();
const ProductController = require('../controllers/productController.js');
const { authorize, authenticate } = require('../middlewares/auth.js');

router.get('/', ProductController.readProduct);

router.use(authenticate);
router.get('/:id', ProductController.readOneProduct);

router.post('/', authorize, ProductController.createProduct);
router.put('/:id', authorize, ProductController.updateProduct);
router.delete('/:id', authorize, ProductController.deleteProduct);

module.exports = router;