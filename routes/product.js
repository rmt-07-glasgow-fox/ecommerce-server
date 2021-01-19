const router = require('express').Router();
const productController = require('../controllers/productController');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', productController.getAll);
router.post('/', isAdmin, productController.store);
router.put('/:id', isAdmin, productController.update);
router.delete('/:id', isAdmin, productController.destroy);

module.exports = router