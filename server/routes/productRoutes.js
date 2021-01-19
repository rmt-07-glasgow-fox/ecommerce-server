const { ProductController } = require('../controllers')
const express = require('express')
const router = express.Router()

router.get('/', ProductController.getProducts)
router.post('/', ProductController.addProducts)
router.get('/:id', ProductController.getProductsId)
router.put('/:id', ProductController.editProducts)
router.delete('/:id', ProductController.deleteProducts)

module.exports = router