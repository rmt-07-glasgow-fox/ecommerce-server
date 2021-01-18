const router = require('express').Router()

const { authenticate } = require('../middlewares/auth')
const errorHandler = require('../middlewares/errorHandler')
const userRouter = require('./auth')
const productRouter = require('./product')

router.use('/',userRouter)

router.use(authenticate)
router.use('/products', productRouter)

router.use(errorHandler)

module.exports = router