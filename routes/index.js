const router = require('express').Router()
const routerAuth = require('./auth.js')
const routerProduct = require('./product.js')

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome~" })
} )
router.use(routerAuth)
router.use('/products', routerProduct)

module.exports = router