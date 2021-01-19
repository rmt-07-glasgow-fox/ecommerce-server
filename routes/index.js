const router = require('express').Router()
const routerAuth = require('./auth.js')
const routerProduct = require('./product.js')
const { authenticate } = require('../middlewares/auth.js')

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome~" })
} )
router.use(routerAuth)

router.use(authenticate)
router.use('/products', routerProduct)

module.exports = router