const ProductController = require('../controller/productController')
const router = require('express').Router()
const { authentication, authCustomer } = require('../middlewares/auth')
 
router.get('/', ProductController.getall)
router.post('/create', authentication, ProductController.create)
router.put('/update/:id', authentication, ProductController.update)
router.delete('/delete/:id', authentication, ProductController.delete)

router.get('/cart-Customer', authCustomer, ProductController.getAllCartUser)
router.post('/cart-Customer/:id', authCustomer, ProductController.addToCart)
router.put('/cart-Customer/:id/min', authCustomer, ProductController.minCart)
router.put('/cart-Customer/:id/plus', authCustomer, ProductController.plusCart)
router.delete('/cart-Customer/:id/delete', authCustomer, ProductController.deleteCart)
router.put('/cart-Customer', authCustomer, ProductController.checkout)


module.exports = router