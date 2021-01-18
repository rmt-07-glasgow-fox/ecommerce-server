const router = require('express').Router()
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const authentication = require('../middlewares/auth').authentication

router.use(authRoutes)
router.use(authentication)
router.use('/products', productRoutes)

module.exports = router