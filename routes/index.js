const express = require('express')
const router = express.Router()

const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const {authenticate} = require('../middlewares/auth')

router.use('/',userRoute)
router.use(authenticate)
router.use('/',productRoute)

module.exports = router