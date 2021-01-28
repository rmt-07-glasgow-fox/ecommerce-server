const ProductController = require('../controller/productController')
const router = require('express').Router()
const { authentication, authCustomer } = require('../middlewares/auth')
 
router.get('/', ProductController.getall)
router.post('/create', authentication, ProductController.create)
router.put('/update/:id', authentication, ProductController.update)
router.delete('/delete/:id', authentication, ProductController.delete)

router.post('/cart-Customer/:id', authCustomer, ProductController.addToCart)


module.exports = router