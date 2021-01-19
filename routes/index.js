const ProductController = require('../controllers/productController')
const UserController = require('../controllers/userController')
const { authAdmin, authenticate } = require('../middlewares/auth')
const { errorHandler } = require('../middlewares/errorHandler')
const productRoutes = require('./products')
const router = require('express').Router()

router.post('/loginAdmin', authAdmin, UserController.login)

router.use(authenticate)
router.get('/products', ProductController.getProducts)

router.use(authAdmin)
router.use('/products', productRoutes)

router.use(errorHandler)

module.exports = router