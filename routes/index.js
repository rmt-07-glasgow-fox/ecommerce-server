const router = require('express').Router()
const authRouter = require('./auth')
const productRouter = require('./products')
const bannerRouter = require('./banners')
const { authentication } = require('../middlewares/auth')

router.use('/', authRouter)
router.use(authentication)
router.use('/products', productRouter)
router.use('/banners', bannerRouter)

module.exports = router