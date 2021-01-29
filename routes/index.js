const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')
const cartProductRouter = require('./cartProduct')

router.use(userRouter)
router.use(cartProductRouter)
router.use(cartRouter)
router.use(productRouter)

module.exports = router