const { CategoryController } = require('../controllers')
const router = require('express').Router()
const { authorized } = require('../middlewares')

router.get('/', CategoryController.getCategories)
router.post('/', authorized, CategoryController.createCategories)
router.delete('/:id', authorized, CategoryController.deleteCategories)

module.exports = router
