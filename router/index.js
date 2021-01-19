const router = require('express').Router()

// import router
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const bannerRouter = require('./bannerRouter')

// import authenticate / authorize
const { authenticate } = require('../middleware/auth')

// setting router
router.use('/user', userRouter)
router.use('/banners', authenticate, bannerRouter)
router.use('/products', authenticate, productRouter)

module.exports = router