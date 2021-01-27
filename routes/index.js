const router = require('express').Router()

const userRoutes = require('./user')
const productsRoutes = require('./products')
const wishlistRoutes = require('./wishlist')

router.use('/', userRoutes)
router.use('/products', productsRoutes)
router.use('/wishlist', wishlistRoutes)

module.exports = router
