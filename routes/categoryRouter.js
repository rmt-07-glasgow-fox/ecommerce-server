const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const { authorize } = require('../middlewares/auth')

router.get('/', CategoryController.fetchCategories)
router.post('/', authorize, CategoryController.createCategory)
router.delete('/:id', authorize, CategoryController.deleteCategory)

module.exports = router;