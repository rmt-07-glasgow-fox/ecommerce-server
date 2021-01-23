const express = require('express')
const router = express.Router()
const {ProductController} = require('../controllers/ProductController')
const { authorize } = require('../middlewares/authentication')

router.get('/products', ProductController.getProduct)
router.post('/products', ProductController.addProduct)
router.get('/products/:id', authorize, ProductController.getOneProduct)
router.delete('/products/:id', authorize, ProductController.deleteProduct)
router.put('/products/:id', authorize, ProductController.editProduct)
router.patch('/products/:id', authorize, ProductController.editOne)

module.exports = router