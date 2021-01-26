const express = require('express')
const router = express.Router()
const controller = require('../controllers/productController')

router.post('/product', controller.addProduct)
router.get('/product', controller.showAllProducts)
router.get('/product/:category', controller.showProductsByCategory)
router.get('/productOne/:id', controller.getProductById)
router.put('/product/:id', controller.editProduct)
router.patch('/product/:id', controller.updateStock)
router.delete('/product/:id', controller.deleteProduct)


module.exports = router