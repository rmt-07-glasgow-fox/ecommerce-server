const router = require('express').Router()

const userRoutes = require('./user')
const productsRoutes = require('./products')
const { authenticate, authAdmin } = require('../middlewares/auth')

router.use('/', userRoutes)
router.use('/products', authenticate)
router.use('/products', authAdmin)
router.use('/products', productsRoutes)

module.exports = router
