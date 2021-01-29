const router = require('express').Router()
const cartController = require('../controllers/cartController')
const productController = require('../controllers/productController')
const { customerAuthenticate } = require('../middlewares/auth')

// router.use(customerAuthenticate)
router.get('/cart', cartController.get)
router.patch('/cart/:id', cartController.updateStatus)
router.get('/productCustomer', productController.read)


module.exports = router