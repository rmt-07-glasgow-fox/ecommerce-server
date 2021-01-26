const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const { categoryAuthorization, authentication } = require('../middlewares/auth')

router.get('/', CategoryController.getAllCategories)
router.use(authentication)
router.post('/', CategoryController.addCategory)
router.get('/:id', categoryAuthorization, CategoryController.getCategoryById)
router.put('/:id', categoryAuthorization, CategoryController.editCategoryById)
router.delete('/:id', categoryAuthorization, CategoryController.deleteCategoryById)

module.exports = router