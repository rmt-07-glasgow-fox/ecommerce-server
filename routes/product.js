const ProductController = require('../controllers/product')
const { authorize } = require('../middlewares/auth')

const router = require('express').Router()

router.route('/')
  .post(authorize, ProductController.create)

module.exports = router