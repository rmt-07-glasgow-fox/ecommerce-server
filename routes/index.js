const router = require('express').Router()

const userRoutes = require('./user')
const productsRoutes = require('./products')
const wishlistRoutes = require('./wishlist')
const cartRoutes = require('./cart')

router.use('/', userRoutes)
router.use('/products', productsRoutes)
router.use('/wishlist', wishlistRoutes)
router.use('/cart', cartRoutes)

module.exports = router
