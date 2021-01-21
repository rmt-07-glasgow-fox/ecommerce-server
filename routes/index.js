const router = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')

router.use('/api/users', userRoutes)
router.use('/api/products', productRoutes)

module.exports = router