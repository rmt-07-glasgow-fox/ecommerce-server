const router = require('express').Router()
const user = require('./user')
const content = require('./content')
const banner = require('./banner')
const wishlist = require('./wishlist')
const cart = require('./cart')
const { authenticate, authorizeCustomer } = require("../middlewares/auth")

router.use(user)
router.use('/contents', content)
router.use('/banners', banner)
router.use(authenticate)
router.use('/wishlists', authorizeCustomer, wishlist)
router.use('/carts', authorizeCustomer, cart)

module.exports = router