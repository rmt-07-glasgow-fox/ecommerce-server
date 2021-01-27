const router = require('express').Router()
const authRouter = require('./authRouter')
const productsRouter = require('./products')
const cartRouter = require('./cartRouter')
const { authenticate } = require('../middlewares/auth')

router.use(authRouter)
router.use(authenticate)
router.use('/products/customer', cartRouter)
// ini di isi middle ware authentikasi apakah admin atau bukan
router.use('/products', productsRouter)

module.exports = router

