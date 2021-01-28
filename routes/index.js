const router = require('express').Router()
const Auth = require('../middlewares/auth')
const auth = require('./auth')
const product = require('./product')
const banner = require('./banner')
const category = require('./category')
const cart = require('./cart')
const wishlist = require('./wishlist')
const transaction = require('./transaction')
const { errorHandlers } = require('../middlewares/errorHandlers')

router.get('/', (req, res) => {
  res.send('Welcome to ECommerce Server by Hanii!')
})

router.use(auth)
router.use('/products', product)
router.use('/banners', banner)
router.use('/categories', category)
router.use('/carts', cart)
router.use('/wishlists', wishlist)
router.use('/transactions', transaction)

router.use(errorHandlers)

module.exports = router