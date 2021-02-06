const router = require('express').Router();
const CategoryController = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', CategoryController.getCategories);
router.use(authenticate);
router.post('/', authorize, CategoryController.postCategory);
router.delete('/:id', authorize, CategoryController.deleteCategory);

module.exports = router;