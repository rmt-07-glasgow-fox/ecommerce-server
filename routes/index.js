const router = require('express').Router()
const authRouter = require('./authRouter')
const productsRouter = require('./products')
const { authenticate } = require('../middlewares/auth')

router.use(authRouter)
router.use(authenticate)
router.use('/products', productsRouter)

module.exports = router

