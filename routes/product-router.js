const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product-controller')
const { authorize } = require('../middleware/auth')

router.post('/products',  ProductController.createProduct)
router.get('/products',  ProductController.readProduct)
router.put('/products/:id',  ProductController.updateProduct)
router.delete('/products/:id', ProductController.deleteProduct)

module.exports = router