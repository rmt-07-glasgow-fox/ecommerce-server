const express = require('express')
const router = express.Router()
const userRouter = require('./user') 
const productRouter = require('./product')
const {authenticate} = require('../middlewares/authentication')

router.use(userRouter)
router.use(authenticate)
router.use(productRouter)

module.exports = router