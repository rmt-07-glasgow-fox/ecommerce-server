const router = require('express').Router()
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const bannerRoutes = require('./bannerRoutes')
const categoryRoutes = require('./categoryRoutes')
const cartRoutes = require('./cartRoutes')

router.use(authRoutes)
router.use('/products', productRoutes)
router.use('/banners', bannerRoutes)
router.use('/categories', categoryRoutes)
router.use('/carts', cartRoutes)

module.exports = router