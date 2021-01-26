const CategoryController = require('../controllers/category')
const { authenticate, authorize, authorizeCategory } = require('../middlewares/auth')

const router = require('express').Router()

router.get('/',CategoryController.showAll)
router.get('/:id', CategoryController.showOne)

router.use(authenticate)
router.post('/', authorize, CategoryController.create)
router.route('/:id')
  .put(authorizeCategory, CategoryController.edit)
  .delete(authorizeCategory, CategoryController.delete)

module.exports = router