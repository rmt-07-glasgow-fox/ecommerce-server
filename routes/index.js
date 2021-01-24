const router = require('express').Router()
const productRouter = require("./productRouter")
const userRouter = require("./userRouter")
const isLogin = require('../middlewares/authentication')

router.use('/users', userRouter)
router.use(isLogin)
router.use('/products', productRouter)

module.exports = router