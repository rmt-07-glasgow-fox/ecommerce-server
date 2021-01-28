const ProductController = require('../controllers/productController')
const UserController = require('../controllers/userController')
const { authAdmin, authenticate } = require('../middlewares/auth')
const { errorHandler } = require('../middlewares/errorHandler')
const productRoutes = require('./products')
const router = require('express').Router()
const cartRoutes = require('./cart')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/loginAdmin', authAdmin, UserController.login)
router.get('/products', ProductController.getProducts)

router.use(authenticate)
router.use('/carts', cartRoutes)

router.use(authAdmin)
router.use('/products', productRoutes)

router.use(errorHandler)

module.exports = router