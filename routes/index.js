const router = require('express').Router()
const {errHandler} = require('../middleware/errHandler')
const routerAuth = require('./auth')

router.use(routerAuth)
router.use(errHandler)

module.exports = router