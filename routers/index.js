const router = require('express').Router()
const login = require('./auth')
const {authenticate} = require('../middlewares/auth')
const product = require('./product')

router.use(login)
router.use(authenticate)
router.use('/products', product)

module.exports = router