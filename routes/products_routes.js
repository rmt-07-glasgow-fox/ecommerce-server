const express = require('express')
const router = express.Router()
const { ProductController } = require('../controllers/product_controllers')
const { authorize } = require('../middlewares/auth')

router.get('/', ProductController.findProduct)
router.get('/:id', ProductController.findProductById)
router.post('/', ProductController.createProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.destroyProduct)

module.exports = router