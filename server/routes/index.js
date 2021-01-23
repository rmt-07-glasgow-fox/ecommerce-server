const { authenticate } = require('../middlewares')
const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const bannerRoutes = require('./bannerRoutes')
const categoryRoutes = require('./categoriesRoutes')

router.use(userRoutes)
router.use(authenticate)
router.use('/products', productRoutes)
router.use('/banners', bannerRoutes)
router.use('/categories', categoryRoutes)

module.exports = router