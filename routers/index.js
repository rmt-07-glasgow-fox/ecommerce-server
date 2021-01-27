const router = require('express').Router()
const login = require('./auth')
const {authenticate} = require('../middlewares/auth')
const product = require('./product')
const banner = require('./banner')
const cart = require('./cart')
const wishlist = require('./wishlist')

router.use(login)
router.use(authenticate)
router.use('/products', product)
router.use('/banners', banner)
router.use('/carts', cart)
router.use('/wishlists', wishlist)

module.exports = router