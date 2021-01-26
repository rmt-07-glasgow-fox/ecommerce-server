const router = require('express').Router()
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const bannerRoutes = require('./bannerRoutes')
const categoryRoutes = require('./categoryRoutes')

router.use(authRoutes)
router.use('/products', productRoutes)
router.use('/banners', bannerRoutes)
router.use('/categories', categoryRoutes)

module.exports = router