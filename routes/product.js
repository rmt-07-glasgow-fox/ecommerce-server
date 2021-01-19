const router = require('express').Router()

const ProductController = require('../controller/productController')

router.get('/', ProductController.fetchAll)
router.post('/', ProductController.addProduct)
router.put('/:id', ProductController.updateProd)
router.delete('/:id', ProductController.delProduct)

module.exports = router