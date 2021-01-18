const router = require('express').Router()
const authRouter = require('./authRouter')

router.use(authRouter)

module.exports = router

