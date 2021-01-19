const router = require('express').Router()
const userRoute = require('./user')
const productRoute = require('./product')

router.use('/api/users', userRoute)
router.use('/api/products', productRoute)

module.exports = router