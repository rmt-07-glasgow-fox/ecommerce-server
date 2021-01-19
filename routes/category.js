const CategoryController = require('../controllers/category')
const { authorize, authorizeCategory } = require('../middlewares/auth')

const router = require('express').Router()

router.route('/')
  .get(CategoryController.showAll)
  .post(authorize, CategoryController.create)

router.route('/:id')
  .get(CategoryController.showOne)
  .put(authorizeCategory, CategoryController.edit)
  .delete(authorizeCategory, CategoryController.delete)

module.exports = router