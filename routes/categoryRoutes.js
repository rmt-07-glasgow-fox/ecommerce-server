const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const authorization = require('../middlewares/auth').categoryAuthorization

router.post('/', CategoryController.addCategory)
router.get('/', CategoryController.getAllCategories)
router.get('/:id', authorization, CategoryController.getCategoryById)
router.put('/:id', authorization, CategoryController.editCategoryById)
router.delete('/:id', authorization, CategoryController.deleteCategoryById)

module.exports = router