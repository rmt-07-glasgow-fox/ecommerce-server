const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product-controller')
const { authorize } = require('../middleware/auth')

router.post('/products', authorize, ProductController.createProduct)
router.get('/products',  ProductController.readProduct)
router.put('/products/:id', authorize, ProductController.updateProduct)
router.delete('/products/:id', authorize, ProductController.deleteProduct)

module.exports = router