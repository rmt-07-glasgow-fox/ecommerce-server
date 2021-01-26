const { CategoryController } = require('../controllers')
const router = require('express').Router()
const { authorized } = require('../middlewares')

router.get('/', CategoryController.getCategories)
router.get('/:id', CategoryController.getCategoriesId)
router.post('/', authorized, CategoryController.createCategories)
router.delete('/:id', authorized, CategoryController.deleteCategories)

module.exports = router
