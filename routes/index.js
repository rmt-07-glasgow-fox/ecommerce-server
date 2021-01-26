const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const authentication = require('../middlewares/auth')

router.use('/', userRouter)
router.use(authentication)
router.use('/', productRouter)
module.exports = router