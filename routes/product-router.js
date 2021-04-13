const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product-controller')
const { authorize, authenticate } = require('../middleware/auth')

router.get('/products',  ProductController.readProduct)

router.use(authenticate)
router.post('/products', authorize, ProductController.createProduct)
router.put('/products/:id', authorize, ProductController.updateProduct)
router.delete('/products/:id', authorize, ProductController.deleteProduct)

module.exports = router