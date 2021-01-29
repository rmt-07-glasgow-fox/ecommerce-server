const router = require('express').Router();
const CategoryController = require('../controllers/categoryController.js');
const { authorize, authenticate } = require('../middlewares/auth.js');

router.get('/', CategoryController.readCategory);
router.get('/:id', CategoryController.readOneCategory);

router.use(authenticate);
router.post('/', authorize, CategoryController.createCategory);
router.put('/:id', authorize, CategoryController.updateCategory);
router.delete('/:id', authorize, CategoryController.deleteCategory);

module.exports = router;