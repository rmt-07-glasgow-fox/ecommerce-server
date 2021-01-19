const router = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const { authenticate } = require('../middlewares/authentication')

router.use(userRoutes)
router.use(authenticate)
router.use(productRoutes)

module.exports = router