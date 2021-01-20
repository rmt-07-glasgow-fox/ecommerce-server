const router = require('express').Router()
const login = require('./auth')
const {authenticate} = require('../middlewares/auth')
const product = require('./product')
const banner = require('./banner')

router.use(login)
router.use(authenticate)
router.use('/products', product)
router.use('/banners', banner)

module.exports = router