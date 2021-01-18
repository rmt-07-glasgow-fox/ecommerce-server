const express = require('express')
const router = express.Router()
const {ProductController} = require('../controllers/ProductController')

router.get('/products', ProductController.getProduct)
router.post('/products', ProductController.addProduct)
router.delete('/products/:id', ProductController.deleteProduct)
router.put('/products/:id', ProductController.editProduct)
router.patch('/products/:id', ProductController.editOne)

module.exports = router