const router = require('express').Router()
const authRouter = require('./auth')
const productRouter = require('./products')
const { authentication } = require('../middlewares/auth')

router.use('/', authRouter)
router.use(authentication)
router.use('/products', productRouter)

module.exports = router