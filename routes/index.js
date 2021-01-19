const expres = require('express')
const router = expres.Router()

const productsRoutes = require('./products_routes')
const userRoutes = require('./user_routes')

router.use('/', userRoutes)
router.use('/products', productsRoutes)

module.exports = router