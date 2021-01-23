const express = require('express')
const router = express.Router()

const {ProductController} = require('../controllers/productController')
const {authorize} = require('../middlewares/auth')

router.get('/products',ProductController.getProduct)
router.get('/products/:id',ProductController.getProductId)
router.post('/products',authorize,ProductController.createProduct)
router.put('/products/:id',authorize,ProductController.editProduct)
router.patch('/products/:id',authorize,ProductController.updateProduct)
router.delete('/products/:id',authorize,ProductController.deleteProduct)


module.exports = router