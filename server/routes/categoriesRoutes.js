const { CategoryController } = require('../controllers')
const router = require('express').Router()
const { categoryAuthorized } = require('../middlewares')

router.get('/', CategoryController.getCategories)
router.get('/:id', CategoryController.getCategoriesId)
router.post('/', CategoryController.createCategories)
router.delete('/:id', categoryAuthorized, CategoryController.deleteCategories)

module.exports = router
