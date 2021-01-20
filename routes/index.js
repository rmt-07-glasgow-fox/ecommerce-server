const router = require('express').Router()
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const bannerRoutes = require('./bannerRoutes')
const categoryRoutes = require('./categoryRoutes')
const authentication = require('../middlewares/auth').authentication

router.use(authRoutes)
router.use(authentication)
router.use('/products', productRoutes)
router.use('/banners', bannerRoutes)
router.use('/categories', categoryRoutes)

module.exports = router