const router = require('express').Router()
const Auth = require('../middlewares/auth')
const auth = require('./auth')
const product = require('./product')

router.use(auth)
router.use(Auth.authentication)
router.use('/products', product)

module.exports = router