const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const { authenticate } = require('../middlewares/auth')

router.use('/users', userRouter)
router.use(authenticate)
router.use('/products', productRouter)

module.exports = router