const { authenticate } = require('../middlewares')
const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const bannerRoutes = require('./bannerRoutes')

router.use(userRoutes)
router.use(authenticate)
router.use('/products', productRoutes)
router.use('/banners', bannerRoutes)

module.exports = router