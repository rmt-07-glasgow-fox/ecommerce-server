const router = require('express').Router()

// import router
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const bannerRouter = require('./bannerRouter')
const brandRouter = require('./brandRouter')

// import authenticate / authorize
const { authenticate } = require('../middleware/auth')

// setting router
router.get('/', (req, res) => { res.status(200).send('<h1>welcome to server cms by abdul rozak</h1>') })
router.use('/user', userRouter)
router.use('/banners', authenticate, bannerRouter)
router.use('/products', authenticate, productRouter)
router.use('/brands', authenticate, brandRouter)

module.exports = router