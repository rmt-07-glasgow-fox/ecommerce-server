const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', CategoryController.fetchCategories)
router.use(authenticate)
router.post('/', authorize, CategoryController.createCategory)
router.delete('/:id', authorize, CategoryController.deleteCategory)

module.exports = router;  