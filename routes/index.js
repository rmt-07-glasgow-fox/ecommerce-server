const router = require('express').Router()
const routerUser = require('./routerUser')
const routerProduct = require('./routerProduct')

router.use(routerUser)
router.use('/product', routerProduct)

module.exports = router

