const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')
const cartProductRouter = require('./cartProduct')
const { adminAuthenticate, customerAuthenticate } = require('../middlewares/auth')

router.use(userRouter)
router.use(customerAuthenticate)
router.use(cartProductRouter)
router.use(cartRouter)
router.use(adminAuthenticate)
router.use(productRouter)

module.exports = router