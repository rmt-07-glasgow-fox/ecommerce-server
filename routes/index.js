const router = require('express').Router()

const { authenticate } = require('../middlewares/auth')
const errorHandler = require('../middlewares/errorHandler')
const userRouter = require('./auth')
const productRouter = require('./product')
const bannerRouter = require('./banner')

router.use('/',userRouter)

router.use(authenticate)
router.use('/products', productRouter)
router.use('/banners', bannerRouter)

router.use(errorHandler)

module.exports = router