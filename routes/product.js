const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth.js');

const ProductController = require('../controllers/product.js');

router.use(authenticate);
router.post('/', authorize, ProductController.create);
router.put('/:id', authorize, ProductController.update);
router.delete('/:id', authorize, ProductController.delete);


module.exports = router;