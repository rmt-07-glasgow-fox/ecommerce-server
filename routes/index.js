const router = require('express').Router()
const routerUser = require('./routerUser')
const routerProduct = require('./routerProduct')
// const { authentication } = require('../middlewares/auth')

router.use(routerUser)
// router.use( authentication )
router.use('/product', routerProduct)

module.exports = router

