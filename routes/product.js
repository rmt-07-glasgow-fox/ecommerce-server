const ProductController = require('../controllers/product')
const { authorize, authorizeProduct } = require('../middlewares/auth')

const router = require('express').Router()

router.route('/')
  .get(ProductController.showAll)
  .post(authorize, ProductController.create)

router.route('/:id')
  .get(ProductController.showOne)
  .put(authorizeProduct, ProductController.edit)
  .delete(authorizeProduct, ProductController.delete)

module.exports = router