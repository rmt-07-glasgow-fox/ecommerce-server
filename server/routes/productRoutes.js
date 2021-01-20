const { ProductController } = require('../controllers')
const { authorized } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.get('/', ProductController.getProducts)
router.post('/', authorized, ProductController.addProducts)
router.get('/:id', ProductController.getProductsId)
router.put('/:id', authorized, ProductController.editProducts)
router.delete('/:id', authorized, ProductController.deleteProducts)

module.exports = router