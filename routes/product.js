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

router.post('/cust-products/:id', ProductController.addToCart)
router.get('/cust-products/', ProductController.getCartUser)
router.get('/cust-products-history/', ProductController.getCartUserHistory)
router.put('/cust-products-minus/:id', ProductController.minusCart)
router.put('/cust-products-plus/:id', ProductController.plusCart)
router.delete('/cust-products/:id', ProductController.destroyCart)
router.put('/cust-products/', ProductController.checkout)



module.exports = router