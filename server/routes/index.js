const { authenticate } = require('../middlewares')
const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')

router.use(userRoutes)
router.use(authenticate)
router.use('/products', productRoutes)

module.exports = router