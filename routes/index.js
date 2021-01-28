const router = require('express').Router()

const errorHandler = require('../middlewares/errorHandler')
const userRouter = require('./auth')
const productRouter = require('./product')
const bannerRouter = require('./banner')
const categoryRouter = require('./category')
const cartRouter = require('./cart')

router.use('/',userRouter)

router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/banners', bannerRouter)
router.use('/carts', cartRouter)


router.use(errorHandler)

module.exports = router