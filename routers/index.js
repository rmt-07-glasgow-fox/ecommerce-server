const router = require('express').Router()
const login = require('./auth')
const {authenticate} = require('../middlewares/auth')
const product = require('./product')
const banner = require('./banner')
const cart = require('./cart')

router.use(login)
router.use(authenticate)
router.use('/products', product)
router.use('/banners', banner)
router.use('/carts', cart)

module.exports = router