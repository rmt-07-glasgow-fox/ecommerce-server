const { ProductController } = require('../controllers')
const { productAuthorized } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductsId)
router.post('/', productAuthorized, ProductController.addProducts)
router.put('/:id', productAuthorized, ProductController.editProducts)
router.delete('/:id', productAuthorized, ProductController.deleteProducts)

module.exports = router