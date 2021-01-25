const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const {adminAuthenticate} = require('../middlewares/auth')

router.use(userRouter)
router.use(adminAuthenticate)
router.use(productRouter)

module.exports = router