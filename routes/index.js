const router = require('express').Router()
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const bannerRoutes = require('./bannerRoutes')
const authentication = require('../middlewares/auth').authentication

router.use(authRoutes)
router.use(authentication)
router.use('/products', productRoutes)
router.use('/banners', bannerRoutes)

module.exports = router