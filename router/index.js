const router = require('express').Router()

// import router
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const bannerRouter = require('./bannerRouter')
const brandRouter = require('./brandRouter')
const cartRouter = require('./cartRouter')

// import authenticate / authorize
const { authenticate } = require('../middleware/auth')

// customer only
const ProductController = require('../controllers/productController')
const BannerController = require('../controllers/bannerController')

router.get('/products/customer', ProductController.showProduct)
router.get('/banners/customer', BannerController.showBanner)

// setting router
router.get('/', (req, res) => { res.status(200).send('<h1>welcome to server cms by abdul rozak</h1>') })
router.use('/user', userRouter)
router.use('/banners', authenticate, bannerRouter)
router.use('/products', authenticate, productRouter)
router.use('/brands', authenticate, brandRouter)
router.use('/cart', authenticate, cartRouter) // customer

module.exports = router