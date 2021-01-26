const ProductController = require('../controllers/product')
const { authorize, authorizeProduct, authenticate } = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', ProductController.showAll)
router.get('/:id', ProductController.showOne)

router.use(authenticate)
router.post('/',authorize, ProductController.create)
router.route('/:id')
  .put(authorizeProduct, ProductController.edit)
  .delete(authorizeProduct, ProductController.delete)

module.exports = router